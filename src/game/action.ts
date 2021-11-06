import { flatMap, getPlayerHexes } from "../models/grid";
import { getPlayerHexesAndAdjacent, Hex, Position } from "../models/hex";
import { hexHasMovableItem, Item, ItemClass, Items, ItemType, PlaceableItems, RestrictionArgs } from "../models/item";
import { Player } from "../models/player";
import { State } from "../models/state";
import { renderGameObjects } from "./render";

export enum ActionType {
    Move,
    Place
}

export class Action {
    type: ActionType;
    start: Position;
    cost: number;
    constructor(public item: Item,public end: Position, arg: Position | number) {
        if (arg instanceof Position) {
            this.type = ActionType.Move;
            this.start = arg as Position;
        } else {
            this.type = ActionType.Place;
            this.cost = arg;
        }
    }

    /*
        modify state, update:
        - map, player
    */
    take(state: State) {
        if (this.type === ActionType.Place) {
            state.currentPlayer.money -= this.cost;
        } else {
            state.grid.hexes[this.start.y][this.start.x].item = (undefined as unknown as Item);    
        }
        state.grid.hexes[this.end.y][this.end.x].item = this.item;
        state.grid.hexes[this.end.y][this.end.x].ownedBy = state.currentPlayer.id;

        renderGameObjects(state);
    }

    toString(): string {
        if (this.type === ActionType.Place) {
            return `Place ${ItemType[this.item.type]} on ${this.end}`;
        } else {
            return `Move ${ItemType[this.item.type]} from ${this.start} to ${this.end}`;
        }
    }
}

export function getAllPosibbleMoves(state: State): Action[] {
    const player = state.currentPlayer;
    const playerHexes = getPlayerHexes(state.grid, state.currentPlayer);
    const playerAndAdjacentHexes = getPlayerHexesAndAdjacent(playerHexes, flatMap(state.grid));
    return playerHexes
        .filter(hex => hexHasMovableItem(hex))
        .map(itemHex => getAllPossibleMovesForItem(itemHex, player, playerAndAdjacentHexes)).flat();
}

function getAllPossibleMovesForItem(hex: Hex, player: Player, playerAndAdjacentHexes: Hex[]): Action[] {
    return playerAndAdjacentHexes
        .filter(newHex => canPlaceOnHex(hex, newHex, player, playerAndAdjacentHexes))
        .map(newHex => new Action(hex.item, newHex.position, hex.position));
}

export function getHexItemMoves(hex: Hex, state: State): Action[] {
    const playerHexes = getPlayerHexes(state.grid, state.currentPlayer);
    const playerAndAdjacentHexes = getPlayerHexesAndAdjacent(playerHexes, flatMap(state.grid));
    return playerAndAdjacentHexes
        .filter(newHex => canPlaceOnHex(hex, newHex, state.currentPlayer, playerAndAdjacentHexes))
        .map(newHex => new Action(hex.item, newHex.position, hex.position));
}

export function getAllPlaceableItemPlacements(state: State): Action[] {
    const player = state.currentPlayer;
    const playerHexes = getPlayerHexes(state.grid, state.currentPlayer);
    const playerAndAdjacentHexes = getPlayerHexesAndAdjacent(playerHexes, flatMap(state.grid));
    return PlaceableItems.map((type: ItemType) => {
        return getAllPossiblePlacementsForItem(type, player, playerAndAdjacentHexes); 
    }).flat();
}

export function getAllPossiblePlacementsForItem(type: ItemType, player: Player, playerAndAdjacentHexes: Hex[]): Action[] {
    const item = Items[type];
    return playerAndAdjacentHexes
        .filter(newHex => canPlaceOnHex(item, newHex, player, playerAndAdjacentHexes))
        .map(newHex => new Action(item, newHex.position, item.buildCost as number));//{ item, cost: item.buildCost, position: newHex.position }));
}

function canPlaceOnHex(curr: Item | Hex, newHex: Hex, player: Player, playerAndAdjacentHexes: Hex[]) {
    const item = curr instanceof  Hex ? curr.item : curr;
    return item.hexRestrictions.reduce((acc, restriction) => {
        try {
            const restrictionPassed = restriction(new RestrictionArgs(curr, newHex, player, playerAndAdjacentHexes));
            // console.log(`place ${ItemType[item.type]} on (${newHex.x},${newHex.y}) \t${restrictionPassed ? '√' : 'x'}\t${restriction.name}`);
            return acc && restrictionPassed
        } catch (e) {
            const t = 5;
        } 
        return false;
    }, true);
}

export function getActionHexes(state: State, actions: Action[]): Hex[] {
    const map = flatMap(state.grid);
    return actions.map(action => map.find(hex => hex.position == action.start)) as Hex[];
}
