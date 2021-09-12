import { Hex, HexType } from "../models/hex";
import { State } from "../models/state";

export function createRandomMap(state: State) {
    for (let x = 0; x < state.grid.width; x++) {
        state.grid.Hexes[x] = [];
        for (let y = 0; y < state.grid.height; y++) {
            state.grid.Hexes[x][y] = new Hex(x, y, getHexType(state, x, y));
        }
    }
}

export function getSpacesFromOutside(state: State, x: number, y: number): number {
    // -1 for array being 0-indexed 
    const verticalDistance = y < ((state.grid.height - 1) / 2) ? y : Math.abs(state.grid.height - y - 1);  
    const horizontalDistance = x < ((state.grid.width - 1) / 2) ? x : Math.abs(state.grid.width - x - 1);  
    return Math.min(verticalDistance, horizontalDistance)
}

// export function getMainContinentHexes(state: State): Hex[] {
//     // start in middle, find first hex that is land, recursively traverse every connecting hex until each hex is in array or all remaining hexes are water
//     // find middle land hex
//     var middleLandHex =  
// }

// export function getLandHexClosestToMiddle(state: State): Hex {
//     var x = state.grid.width / 2;
//     var y = state.grid.height / 2;
//     var hex = state.grid.Hexes[x][y];
//     while (hex.type === HexType.Water) {
//         hex = 
//     }
// }

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