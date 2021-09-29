import { Hex, HexType } from "./hex";

export function inBounds(grid: Grid, x: number, y: number): boolean {
    return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
}

export class Grid {
    width: number;
    height: number;
    hexSize: number;
    hexes: Hex[][] = [];
    connectedHexes?: Hex[][] = [];

    constructor(width: number = 32, height: number = 18, hexSize: number = 25) {
        this.width = width;
        this.height = height;
        
        this.hexSize = hexSize;
    }

    get mainContinent() {
        const landMasses = (this.connectedHexes ?? [])
            .filter(h => h[0].type === HexType.Land)
            .sort((a, b) => b.length - a.length);
        return landMasses[0];
    }
}