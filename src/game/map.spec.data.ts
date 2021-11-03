import { Grid } from "../models/grid";
import { Hex } from "../models/hex";

export const testGrid: Grid = {
    "hexes": [
        [
            { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 0, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 0, "type": 0, "ownedBy": 0, "item": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 0, "type": 0, "ownedBy": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 0, "type": 0, "ownedBy": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 0, "type": 0 } as unknown as Hex,
        ],
        [
            { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 1, "type": 0, "ownedBy": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 1, "type": 0, "ownedBy": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 1, "type": 0, "ownedBy": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 1, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 1, "type": 0 } as unknown as Hex,
        ],
        [
            { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 2, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 2, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 2, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 2, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 2, "type": 0 } as unknown as Hex,
        ],
        [
            { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 3, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 3, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 3, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 3, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 3, "type": 0 } as unknown as Hex,
        ],
        [
            { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 4, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 4, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 4, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 4, "type": 0 } as unknown as Hex,
            { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 4, "type": 0 } as unknown as Hex,
        ]
    ],
    "connectedHexes": [[
        { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 0, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 1, "type": 0, "ownedBy": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 0, "type": 0, "ownedBy": 0, "item": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 2, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 1, "type": 0, "ownedBy": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 0, "type": 0, "ownedBy": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 1, "type": 0, "ownedBy": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 3, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 2, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 2, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 0, "type": 0, "ownedBy": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 1, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 0, "y": 4, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 3, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 3, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 2, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 0, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 1, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 2, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 1, "y": 4, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 2, "y": 4, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 3, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 3, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 3, "y": 4, "type": 0 } as unknown as Hex,
        { "discoveredBy": [], "visibleTo": [], "x": 4, "y": 4, "type": 0 } as unknown as Hex,]
    ],
    "width": 5,
    "height": 5,
    "hexSize": 20,
    "longestDiagonal": 23.094010767585033,
    "hexCoords": [0, 10, 5.773502691896258, 0, 17.320508075688775, 0, 23.094010767585033, 10, 17.320508075688775, 20, 5.773502691896258, 20]
};