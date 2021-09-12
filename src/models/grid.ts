import { Hex } from "./hex";

export class Grid {
    width: number;
    height: number;
    hexSize: number;
    Hexes: Hex[][] = [];

    constructor(width: number = 32, height: number = 18, hexSize: number = 25) {
        this.width = width;
        this.height = height;
        this.hexSize = hexSize;
    }
}