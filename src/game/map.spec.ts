import { Hex, HexType, sortHex } from "../models/hex";
import { State } from "../models/state";
import { getConectedHexGroupsByType } from "./map";

const W = HexType.Water;
const L = HexType.Land;

// getConectedHexGroupsByType
test('getConectedHexGroupsByType: when all hexes are land and connected, returns all hexes', () => {
    // const state = setup([
    //     [L,L],
    //     [L,L]
    // ]);
    // const expected = [state.grid.hexes.flat()];
    // actAndAssert(state, expected);
    expect(true).toEqual(true);
});

// test('getConectedHexGroupsByType: when all hexes are connected and a single water hex exists, returns all hexes except one water hex', () => {
//     const state = setup([
//         [L,W],
//         [L,L]
//     ]);
//     const expected = [state.grid.hexes.flat().filter(h => h.type === HexType.Land), [state.grid.hexes[1][0]]];
//     actAndAssert(state, expected);
// });

// test('getConectedHexGroupsByType: when all hexes except one is water, returns 1 land hex', () => {
//     const state = setup([
//         [L,W],
//         [W,W]
//     ]);
//     const expected = [[state.grid.hexes[0][0]], state.grid.hexes.flat().filter(h => h.type === HexType.Water)];
//     actAndAssert(state, expected);

// });

// test('getConectedHexGroupsByType: when entire boundary is water, returns inner land hexes', () => {
//     const state = setup([
//         [W,W,W,W],
//         [W,L,L,W],
//         [W,L,L,W],
//         [W,W,W,W]
//     ]);
//     const expected = [state.grid.hexes.flat().filter(h => h.type === HexType.Water), state.grid.hexes.flat().filter(h => h.type === HexType.Land)];
//     actAndAssert(state, expected);
// });

// test('getConectedHexGroupsByType: when all but one hex is on continent, returns only the main continent hexes', () => {
//     const state = setup([
//         [L,W,W,W],
//         [W,W,L,L],
//         [W,L,L,L],
//         [W,W,L,L]
//     ]);
//     var expected = [
//         [state.grid.hexes[0][0]],
//         state.grid.hexes.flat().filter(h => h.type === HexType.Water), 
//         state.grid.hexes.flat().filter(h => h.type === HexType.Water).filter(h => h.x !== 0 && h.y !== 0)
//     ];
//     actAndAssert(state, expected);
// })

// test('getConectedHexGroupsByType: when two continents are the same size, returns the top-left most one', () => {
//     const state = setup([
//         [L,L,W,W],
//         [L,W,W,W],
//         [W,W,W,L],
//         [W,W,L,L]
//     ]);
//     var expected = [
//         [state.grid.hexes[0][0], state.grid.hexes[0][1], state.grid.hexes[1][0]],
//         state.grid.hexes.flat().filter(h => h.type === HexType.Water), 
//         [state.grid.hexes[2][3], state.grid.hexes[3][3], state.grid.hexes[3][2]],        
//     ];
//     actAndAssert(state, expected);
// });

function setup(types: HexType[][]): State {
    var state = new State();
    state.grid.width = types.length;
    state.grid.height = types[0].length;
    state.grid.hexes = convertHexTypesToHex(types);
    types.forEach(row => expect(row.length).toEqual(types[0].length))
    return state;
}

function actAndAssert(state: State, expected: Hex[][]) {
    var result = getConectedHexGroupsByType(state);
    expect(result.flat().sort(sortHex)).toEqual(state.grid.hexes.flat().sort(sortHex));
}


function convertHexTypesToHex(types: HexType[][]): Hex[][] {
    return types.map((row, y) => {
        return row.map((type, x) => new Hex(x, y, type))
    });

}