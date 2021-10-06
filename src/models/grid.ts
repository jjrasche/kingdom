import { Hex, HexType } from "./hex";

export function inBounds(grid: Grid, x: number, y: number): boolean {
    return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
}

export class Grid {
    width: number;
    height: number;
    hexSize: number;
    hexes: Hex[][] = [];
    hexCoords: number[]; // based on hexSize
    longestDiagonal: number;
    connectedHexes?: Hex[][] = [];

    constructor(width: number = 32, height: number = 18, hexSize: number = 20) {
        this.width = width;
        this.height = height;
        this.hexSize = hexSize;
        this.longestDiagonal = getLongestDiagonal(hexSize);
        this.hexCoords = getHexCoords(hexSize, this.longestDiagonal);
    }
}

export function getMainContinent(grid: Grid) {
    const landMasses = (grid.connectedHexes ?? [])
        .filter(h => h[0].type === HexType.Land)
        .sort((a, b) => b.length - a.length);
    return landMasses[0];
}

export function getHexCoords(hexSize: number, longestDiagonal: number): number[] {
    //http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
    let y: number = hexSize / 2;
    let verticesCoordinates: number[] = [
        0, y,                                       // left-most vertex
        longestDiagonal / 4, 0,                     // top-left vertex 
        longestDiagonal * 3 / 4, 0,                 // top-right vertex 
        longestDiagonal, y,                         // right-most vertex
        longestDiagonal * 3 / 4, 2 * y,             // bottom-right vertex
        longestDiagonal / 4, 2 * y                  // bottom-left vertex
    ];
    return verticesCoordinates;
}

export function getLongestDiagonal(hexSize: number): number {
    return (4 * (hexSize / 2 / Math.sqrt(3)));
}