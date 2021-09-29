import baretest from "baretest";
import assert from "assert";
import { Hex, HexType, sort2DHexArray, sortHexArray } from "../models/hex";
import { State } from "../models/state";
import { createRandomMap, getConectedHexGroupsByType } from "./map";
import { Grid } from "../models/grid";

const W = HexType.Water;
const L = HexType.Land;

// getConectedHexGroupsByType
test('getConectedHexGroupsByType: when all hexes are land and connected, returns all hexes', async () => {
    const grid = setup([
        [L,L],
        [L,L]
    ]);
    const result = (await getConectedHexGroupsByType(grid)).map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    const expected = [grid.hexes.flat()].map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    expect(result).toEqual(expected);
});

test('getConectedHexGroupsByType: when all hexes are connected and a single water hex exists, returns all hexes except one water hex', async () => {
    const grid = setup([
        [L,W],
        [L,L]
    ]);
    const expected = [grid.hexes.flat().filter(h => h.type === HexType.Land), [grid.hexes[0][1]]].map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    const result = (await getConectedHexGroupsByType(grid)).map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    expect(result).toEqual(expected);
});

test('getConectedHexGroupsByType: when all hexes except one is water, returns 1 land hex', async () => {
    const grid = setup([
        [L,W],
        [W,W]
    ]);
    const expected = [
        grid.hexes.flat().filter(h => h.type === HexType.Water),
        [grid.hexes[0][0]]
    ].map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    const result = (await getConectedHexGroupsByType(grid)).map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    expect(result).toEqual(expected);
});

test('getConectedHexGroupsByType: when entire boundary is water, returns inner land hexes', async () => {
    const grid = setup([
        [W,W,W,W],
        [W,L,L,W],
        [W,L,L,W],
        [W,W,W,W]
    ]);
    const expected = [
        grid.hexes.flat().filter(h => h.type === HexType.Water),
        grid.hexes.flat().filter(h => h.type === HexType.Land)
    ].map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    const result = (await getConectedHexGroupsByType(grid)).map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    expect(result).toEqual(expected);
});

test('getConectedHexGroupsByType: when all but one hex is on continent, returns only the main continent hexes', async () => {
    const grid = setup([
        [L,W,W,W],
        [W,W,L,L],
        [W,L,L,L],
        [W,W,L,L]
    ]);
    // var expected = [
    //     [grid.hexes[0][0]],
    //     grid.hexes.flat().filter(h => h.type === HexType.Water), 
    //     grid.hexes.flat().filter(h => h.type === HexType.Water).filter(h => h.x !== 0 && h.y !== 0)
    // ];
    const expected = [
        [grid.hexes[0][0]],
        grid.hexes.flat().filter(h => h.type === HexType.Water), 
        grid.hexes.flat().filter(h => h.type === HexType.Land).filter(h => h.x !== 0 && h.y !== 0)
    ].map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    const result = (await getConectedHexGroupsByType(grid)).map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    expect(result).toEqual(expected);
});

test('getConectedHexGroupsByType: when two continents are the same size, returns the top-left most one', async () => {
    const grid = setup([
        [L,L,W,W],
        [L,W,W,W],
        [W,W,W,L],
        [W,W,L,L]
    ]);
    const expected = [
        [grid.hexes[0][0], grid.hexes[0][1], grid.hexes[1][0]],
        grid.hexes.flat().filter(h => h.type === HexType.Water), 
        [grid.hexes[2][3], grid.hexes[3][3], grid.hexes[3][2]],     
    ].map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    const result = (await getConectedHexGroupsByType(grid)).map(e => e.sort(sortHexArray)).sort(sort2DHexArray);
    expect(result).toEqual(expected);
});


function setup(types: HexType[][]): Grid {
    var grid = new Grid();
    grid.width = types.length;
    grid.height = types[0].length;
    grid.hexes = convertHexTypesToHex(types);
    types.forEach(row => expect(row.length).toEqual(types[0].length))
    return grid;
}

function convertHexTypesToHex(types: HexType[][]): Hex[][] {
    return types.map((row, y) => {
        return row.map((type, x) => new Hex(x, y, type))
    });
}