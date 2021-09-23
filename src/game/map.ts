import { Grid, inBounds } from "../models/grid";
import { Hex, HexType } from "../models/hex";
import { State } from "../models/state";

export function createRandomMap(state: State) {
    for (let x = 0; x < state.grid.width; x++) {
        state.grid.hexes[x] = [];
        for (let y = 0; y < state.grid.height; y++) {
            state.grid.hexes[x][y] = new Hex(x, y, getHexType(state, x, y));
        }
    }
}

export function getSpacesFromOutside(state: State, x: number, y: number): number {
    // -1 for array being 0-indexed 
    const verticalDistance = y < ((state.grid.height - 1) / 2) ? y : Math.abs(state.grid.height - y - 1);  
    const horizontalDistance = x < ((state.grid.width - 1) / 2) ? x : Math.abs(state.grid.width - x - 1);  
    return Math.min(verticalDistance, horizontalDistance)
}

/*
    recursively push out in every direction from a single hex
    - 
*/
export function getConectedHexGroupsByType(state: State): Hex[][] {
    let groupedHexes: Hex[][] = [];
    while (groupedHexes.flat().length < state.grid.hexes.flat().length) {
        const ungroupedHex = state.grid.hexes.flat().find(hex => !groupedHexes.flat().includes(hex));
        if (!ungroupedHex) {
            continue;
        }
        const connectedGroup = getAllHexesConnectedToByType(state.grid, ungroupedHex.x, ungroupedHex.y, ungroupedHex.type);
        groupedHexes.push(connectedGroup);
    }
    return groupedHexes;
}

/*
    termination condition: if type != hex.type
*/
function getAllHexesConnectedToByType(grid: Grid, x: number, y: number, type: HexType, connectedHexes: Hex[] = []): Hex[] {
    try {
        if (!inBounds(grid, x, y)) {
            return []
        }
        const hex = grid.hexes[y][x];
        if (!hex || hex.type != type || connectedHexes.includes(hex)) {
            return [];
        }
        connectedHexes.push(hex);
        var topLeft = getAllHexesConnectedToByType(grid, x - 1, y, type, connectedHexes);
        var top = getAllHexesConnectedToByType(grid, x, y -1, type, connectedHexes);
        var topRight = getAllHexesConnectedToByType(grid, x + 1, y, type, connectedHexes);
        var bottomRight = getAllHexesConnectedToByType(grid, x + 1, y + 1, type, connectedHexes);
        var bottom = getAllHexesConnectedToByType(grid, x, y + 1, type, connectedHexes);
        var bottomLeft = getAllHexesConnectedToByType(grid, x - 1, y + 1, type, connectedHexes);
        var all = topLeft.concat(top).concat(topRight).concat(bottomRight).concat(bottom).concat(bottomLeft).concat([hex]);
        return all;
    } catch(e) {
        console.log(e);
    }
    return [];
}

// export function const findHexSearchingInCircularPattern(state: State, startX: number, startY: number, )

export function getHexType(state: State, x: number, y: number) {
    const spacesToOutside = getSpacesFromOutside(state, x, y);
    let chanceLand;
    switch (spacesToOutside) {
        case 0:
            chanceLand = 0;
            break;
        case 1:
            chanceLand = .7;
            break;
        case 2:
            chanceLand = .8;
            break;
        case 3:
            chanceLand = .85;
            break;
        case 4:
            chanceLand = .9;
            break;
        case 5:
            chanceLand = .95;
            break;
        default:
            chanceLand = .999;
    }
    return Math.random() < chanceLand ? HexType.Land : HexType.Water;
}