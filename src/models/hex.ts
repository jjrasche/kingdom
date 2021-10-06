import { randomBetween } from "../helpers/number";
import { Grid } from "./grid";
import { ItemType } from "./item";

export const top = (hex: Hex, grid: Grid): Hex | undefined => {
    const row = grid.hexes[hex.y - 1]
    if (!!row) {
        return row[hex.x];
    }
}
export const topLeft = (hex: Hex, grid: Grid): Hex | undefined => {
    const row = grid.hexes[hex.y - (hex.x % 2 === 0 ? 1 : 0)]
    if (!!row) {
        return row[hex.x - 1];
    }
}
export const topRight = (hex: Hex, grid: Grid): Hex | undefined => {
    const row = grid.hexes[hex.y - (hex.x % 2 === 0 ? 1 : 0)]
    if (!!row) {
        return row[hex.x + 1];
    }
}
export const bottom = (hex: Hex, grid: Grid): Hex | undefined => {
    const row = grid.hexes[hex.y + 1]
    if (!!row) {
        return row[hex.x];
    }
}
export const bottomLeft = (hex: Hex, grid: Grid): Hex | undefined => {
    const row = grid.hexes[hex.y + (hex.x % 2 === 0 ? 0 : 1)]
    if (!!row) {
        return row[hex.x - 1];
    }
}
export const bottomRight = (hex: Hex, grid: Grid): Hex | undefined => {
    const row = grid.hexes[hex.y + (hex.x % 2 === 0 ? 0 : 1)]
    if (!!row) {
        return row[hex.x + 1];
    }
}

export const getRandomAttachedHexOfSameType = (hex: Hex, grid: Grid): Hex | undefined => {
    const attachedHexes = [
    	top(hex, grid),
		topLeft(hex, grid),
		topRight(hex, grid),
		bottom(hex, grid),
		bottomLeft(hex, grid),
		bottomRight(hex, grid)];
    const sameTypeHexes = attachedHexes.filter(h => !!h && h.type === hex.type);
    if (sameTypeHexes.length !== 0) {
        return sameTypeHexes[randomBetween(0, sameTypeHexes.length - 1)];
    }
}

export function sortHexArray(a: Hex, b: Hex): number {
    if (a.x != b.x) {
        return a.x - b.x;
    } else {
        return a.y - b.y;
    }
}

export function sort2DHexArray(a: Hex[], b: Hex[]): number {
    if (a.length < b.length) {
        return -1;
    }
    return sortHexArray(a[0], b[0]);
} 

export enum HexType {
    Land,
    Water
}

export class Hex {
    x: number;
    y: number;
    type: HexType
    discoveredBy: number[] = [];
    visibleTo: number[] = [];
    ownedBy: number;
    item: ItemType;
    gameObject: Phaser.GameObjects.Polygon;

    constructor(x: number, y: number, type: HexType, discoveredBy: number[] = [], visibleTo: number[] = [], ownedBy?: number, item?: ItemType) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.discoveredBy = discoveredBy;
        this.visibleTo = visibleTo;
        this.ownedBy = ownedBy!;
        this.item = item!;
    }

    set color(color: number) {
        this.gameObject?.setFillStyle(color);
    }
}