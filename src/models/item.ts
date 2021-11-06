import { ActionType } from "../game/action";
import { breadthFirstSearch, getDistanceBetweenHexes } from "../game/map";
import { getPlayerHexes, Grid } from "./grid";
import { getAdjacentHexes, Hex, HexType } from "./hex"
import { Player } from "./player";
import { State } from "./state";

export enum ItemType {
    Castle,
    Grave,
    House,
    Man0,
    Man1,
    Man2,
    Man3,
    Palm,
    Pine,
    Tower,
    StrongTower
}

export const PlaceableItemCursorMap: {[key: number]: string } = {
    [ItemType.House]: "house_cur.png",
    [ItemType.Man0]: "man0_cur.png",
    [ItemType.Man1]: "man1_cur.png",
    [ItemType.Man2]: "man2_cur.png",
    [ItemType.Man3]: "man3_cur.png",
    [ItemType.Tower]: "tower_cur.png",
    [ItemType.StrongTower]: "strong_tower_cur.png",
}

export const canPlaceItem = (type: ItemType) => !!PlaceableItems[type]
export const PlaceableItems: number[] = Object.keys(PlaceableItemCursorMap).map(key => parseInt(key));

export enum ItemClass {
    Unit,
    Defense,
    Resource,
    Generated
}

export interface Item {
    type: ItemType;
    class: ItemClass;
    buildCost?: number;
    captureReward?: number;
    attack?: number;   // 0 is lowest and 
    defense?: number;   // 0 is lowest and 
    movement?: number;
    hexRestrictions: ((a: RestrictionArgs) => boolean)[];
}
export class RestrictionArgs {
    hex: Hex;
    item: Item;
    actionType: ActionType
    constructor(curr: Hex | Item, public newHex: Hex, public player: Player, public map: Hex[]) {
        this.actionType = curr instanceof Hex ? ActionType.Move : ActionType.Place;
        this.hex = curr as Hex;
        this.item = curr instanceof Hex ? curr.item : curr;
    }
}

const isLand = (a: RestrictionArgs) => a.newHex.type === HexType.Land; 
const owned = (a: RestrictionArgs) => a.newHex.ownedBy === a.player.id;
const canAfford = (a: RestrictionArgs) => a.item.buildCost;
// const withinRange = (a: RestrictionArgs) => a.actionType === ActionType.Place || getDistanceBetweenHexes(a.hex, a.newHex) <= (a.hex.item.movement ?? 0);
const withinRange = (a: RestrictionArgs) => {
    if (a.actionType === ActionType.Move) {
        const distance = breadthFirstSearch(a.hex, a.newHex, a.map);
        // console.log(`(${a.hex.x}, ${a.hex.y}) is ${distance} away from (${a.newHex.x}, ${a.newHex.y})`)
        return distance < (a.hex.item.movement ?? 0);
    }
    return false
}
const noExistingItem = (a: RestrictionArgs) => a.newHex.item == null;
const noItemOrCanImproveUnit = (a: RestrictionArgs) => {
    if (noExistingItem(a)) {
        return true
    }
    return a.newHex.item.class === ItemClass.Unit && ((a.item.attack ?? 0) + (a.newHex.item.attack ?? 0) <= (Items[ItemType.Man3].attack  ?? 0));
}
const noItemOrCanImproveDefense = (a: RestrictionArgs) => {
    if (noExistingItem(a)) {
        return true
    }
    return a.newHex.item.class === ItemClass.Defense && ((a.newHex.item.defense ?? 0) < (a.item.defense ?? 0));
}
/*
    unsure how to codify an AoE without large compute load
*/
// const nextToOwned = (grid: Grid, hex: Hex, player: Player) => {
//     return getPlayerHexes(player)
// };
// const canTakeDefenses = (hex: Hex, player: Player, item: Item) => {
//     const hexItem = Items[hex.item].defense
// };
const cantPlace = () => false;

export const Castle =  { type: ItemType.Castle, class: ItemClass.Generated, captureReward: 10, defense: 1, hexRestrictions: [cantPlace]  } as Item;
export const Grave =  { type: ItemType.Grave, class: ItemClass.Generated, hexRestrictions: [cantPlace]  } as Item;
export const Palm =  { type: ItemType.Palm, class: ItemClass.Generated, captureReward: 10, hexRestrictions: [cantPlace]  } as Item;
export const Pine =  { type: ItemType.Pine, class: ItemClass.Generated, captureReward: 10, hexRestrictions: [cantPlace]  } as Item;
export const Man0 =  { type: ItemType.Man0, class: ItemClass.Unit, buildCost: 10, attack: 1, defense: 1, movement: 5, hexRestrictions: [isLand, withinRange, canAfford, noItemOrCanImproveUnit]  } as Item;
export const Man1 =  { type: ItemType.Man1, class: ItemClass.Unit, buildCost: 20, attack: 2, defense: 2, movement: 5, hexRestrictions: [isLand, withinRange, canAfford, noItemOrCanImproveUnit]  } as Item;
export const Man2 =  { type: ItemType.Man2, class: ItemClass.Unit, buildCost: 30, attack: 3, defense: 3, movement: 5, hexRestrictions: [isLand, withinRange, canAfford, noItemOrCanImproveUnit]  } as Item;
export const Man3 =  { type: ItemType.Man3, class: ItemClass.Unit, buildCost: 40, attack: 4, defense: 4, movement: 5, hexRestrictions: [isLand, withinRange, canAfford, noItemOrCanImproveUnit]  } as Item;
export const House =  { type: ItemType.House, class: ItemClass.Resource, buildCost: 10, captureReward: 10, hexRestrictions: [isLand, owned, canAfford, noExistingItem]  } as Item;
export const Tower =  { type: ItemType.Tower, class: ItemClass.Defense, buildCost: 15, captureReward: 10, defense: 2, hexRestrictions: [isLand, owned, canAfford, noItemOrCanImproveDefense]  } as Item;
export const StrongTower =  { type: ItemType.StrongTower, class: ItemClass.Defense, buildCost: 35, captureReward: 25, defense: 3, hexRestrictions: [isLand, owned, canAfford, noItemOrCanImproveDefense]  } as Item;

export const Items: { [key in ItemType]: Item} = {
    [ItemType.Castle]: Castle,
    [ItemType.Grave]: Grave,
    [ItemType.Palm]: Palm,
    [ItemType.Pine]: Pine,
    [ItemType.Man0]: Man0,
    [ItemType.Man1]: Man1,
    [ItemType.Man2]: Man2,
    [ItemType.Man3]: Man3,
    [ItemType.House]: House,
    [ItemType.Tower]: Tower,
    [ItemType.StrongTower]: StrongTower
};

export const hexHasMovableItem = (hex: Hex) => hex.item != null && hex.item.class == ItemClass.Unit;

export function getCurrentPlayerItemHexes(state: State): Hex[] {
    return getPlayerHexes(state.grid, state.currentPlayer)
        .filter(hex => hexHasMovableItem(hex));
}


/*
    Things an Item needs
    - CanBePutOnHex: isLand, isOwned, isAdjacentToOwned
    - HasSufficient funds
*/

