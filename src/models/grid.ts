import { Hex } from "./hex";

export class Grid {
    width: number;
    height: number;
    Hexes: Hex[][] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}