import { Hex, HexType } from "./hex"
import { Player } from "./player";

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

export enum ItemClass {
    Unit,
    Defense,
    Resource,
    Generated
}

export interface Item {
    class: ItemClass;
    buildCost?: number;
    removeReward?: number;
    canPlaceOnHex: ((hex: Hex, player: Player) => boolean)[];
}

const isLand = (hex: Hex) => hex.type === HexType.Land; 
const isDefended = (hex: Hex) => hex.type === HexType.Land; 
const owned = (hex: Hex, player: Player) => hex.ownedBy === player.id; 

export const Items: { [key in ItemType]: Item} = {
    [ItemType.Castle]: { class: ItemClass.Generated, removeReward: 10, canPlaceOnHex: [isLand, owned]  } as Item,
    [ItemType.Grave]: { class: ItemClass.Generated, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.House]: { class: ItemClass.Resource, buildCost: 10, removeReward: 10, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Man0]: { class: ItemClass.Unit, buildCost: 10, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Man1]: { class: ItemClass.Unit, buildCost: 20, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Man2]: { class: ItemClass.Unit, buildCost: 30, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Man3]: { class: ItemClass.Unit, buildCost: 40, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Palm]: { class: ItemClass.Generated, removeReward: 10, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Pine]: { class: ItemClass.Generated, removeReward: 10, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.Tower]: { class: ItemClass.Defense, buildCost: 15, removeReward: 10, canPlaceOnHex: [isLand]  } as Item,
    [ItemType.StrongTower]: { class: ItemClass.Defense, buildCost: 35, removeReward: 25, canPlaceOnHex: [isLand]  } as Item,
};



/*
    Things an Item needs
    - CanBePutOnHex: isLand, isOwned, isAdjacentToOwned
    - HasSufficient funds
*/

