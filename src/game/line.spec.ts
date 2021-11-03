import baretest from "baretest";
import assert from "assert";
import { Hex, HexType, sort2DHexArray, sortHexArray } from "../models/hex";
import { State } from "../models/state";
import { createRandomMap, getConectedHexGroupsByType } from "./map";
import { Grid } from "../models/grid";
import { getExteiorLines, Line } from "../models/line";

const W = HexType.Water;
const L = HexType.Land;


test('getExteiorLines', async () => {
    const u = undefined;
    const grid = setupFromPlayerOwned([
        [0,0,u,u],
        [u,0,u,u],
        [u,0,0,u],
        [u,u,0,u]
    ]);
    const expected: Line[] = [
        
    ];
    const ownedHexes = grid.hexes.flat().filter(h => h.ownedBy === 0);
    const result = getExteiorLines(ownedHexes);
    expect(result).toEqual(expected);
});

function setupFromPlayerOwned(ownedBy: (number | undefined)[][]): Grid {
    var grid = new Grid();
    grid.width = ownedBy.length;
    grid.height = ownedBy[0].length;
    grid.hexes = convertPlayerOwnedToHex(ownedBy);
    return grid;
}

function convertPlayerOwnedToHex(ownedBy: (number | undefined)[][]): Hex[][] {
    return ownedBy.map((row, y) => {
        return row.map((o, x) => new Hex(x, y, HexType.Land, o))
    });
}
