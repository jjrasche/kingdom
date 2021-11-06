import { Grid } from "../models/grid";
import { Hex } from "../models/hex";

export const testGrid: Grid = {
    "hexes": [
        [
            new Hex(0, 0, 0),
            new Hex(1, 0, 0, 0, 0),
            new Hex(2, 0, 0, 0, 4),
            new Hex(3, 0, 0, 0, 9),
            new Hex(4, 0, 0),
        ],
        [
            new Hex(0, 1, 0, 0),
            new Hex(1, 1, 0, 0, 3),
            new Hex(2, 1, 0, 0),
            new Hex(3, 1, 0),
            new Hex(4, 1, 0),
        ],
        [
            new Hex(0, 2, 0),
            new Hex(1, 2, 0),
            new Hex(2, 2, 0, 0),
            new Hex(3, 2, 0),
            new Hex(4, 2, 0),
        ],
        [
            new Hex(0, 3, 0),
            new Hex(1, 3, 0),
            new Hex(2, 3, 0, 0),
            new Hex(3, 3, 0, 0),
            new Hex(4, 3, 0),
        ],
        [
            new Hex(0, 4, 0),
            new Hex(1, 4, 0),
            new Hex(2, 4, 0),
            new Hex(3, 4, 0),
            new Hex(4, 4, 0, 0, 3),
        ]
    ],
    "connectedHexes": [[
        new Hex(0, 0, 0),
        new Hex(1, 0, 0, 0, 0),
        new Hex(2, 0, 0, 0, 3),
        new Hex(3, 0, 0, 0, 9),
        new Hex(4, 0, 0),
        new Hex(0, 1, 0, 0),
        new Hex(1, 1, 0, 0),
        new Hex(2, 1, 0, 0),
        new Hex(3, 1, 0),
        new Hex(4, 1, 0),
        new Hex(0, 2, 0),
        new Hex(1, 2, 0),
        new Hex(2, 2, 0, 0),
        new Hex(3, 2, 0),
        new Hex(4, 2, 0),
        new Hex(0, 3, 0),
        new Hex(1, 3, 0),
        new Hex(2, 3, 0, 0),
        new Hex(3, 3, 0, 0),
        new Hex(4, 3, 0),
        new Hex(0, 4, 0),
        new Hex(1, 4, 0),
        new Hex(2, 4, 0),
        new Hex(3, 4, 0),
        new Hex(4, 4, 0, 0),
    ]],
    "width": 5,
    "height": 5,
    "hexSize": 20,
    "longestDiagonal": 23.094010767585033,
    "hexCoords": [0, 10, 5.773502691896258, 0, 17.320508075688775, 0, 23.094010767585033, 10, 17.320508075688775, 20, 5.773502691896258, 20]
};