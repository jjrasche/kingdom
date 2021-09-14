import { Hex } from "./hex";

export function inBounds(grid: Grid, x: number, y: number): boolean {
    return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
}

export class Grid {
    width: number;
    height: number;
    hexSize: number;
    hexes: Hex[][] = [];

    constructor(width: number = 32, height: number = 18, hexSize: number = 25) {
        this.width = width;
        this.height = height;
        this.hexSize = hexSize;
    }
}