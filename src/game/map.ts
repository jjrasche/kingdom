import { Grid, inBounds } from "../models/grid";
import { Hex, HexType } from "../models/hex";


export async function createRandomMap(grid: Grid) {
    for (let y = 0; y < grid.height; y++) {
        grid.hexes[y] = [];
        for (let x = 0; x < grid.width; x++) {
            grid.hexes[y][x] = new Hex(x, y, getHexType(grid, x, y));
        }
    }
    grid.connectedHexes = await getConectedHexGroupsByType(grid);
}

export function getSpacesFromOutside(grid: Grid, x: number, y: number): number {
    // -1 for array being 0-indexed 
    const verticalDistance = y < ((grid.height - 1) / 2) ? y : Math.abs(grid.height - y - 1);  
    const horizontalDistance = x < ((grid.width - 1) / 2) ? x : Math.abs(grid.width - x - 1);  
    return Math.min(verticalDistance, horizontalDistance)
}

/*
    recursively push out in every direction from a single hex
    - 
*/
export async function getConectedHexGroupsByType(grid: Grid): Promise<Hex[][]> {
    let groups: Hex[][] = [];
    const hex = []
    var count = 0;
    while (groups.flat().length < grid.hexes.flat().length) {
        const groupedHexes = groups.flat();
        const ungroupedHexs = grid.hexes.flat().filter(hex => !groupedHexes.includes(hex));
        const ungroupedHex = ungroupedHexs[0];
        if (!ungroupedHex) {
            continue;
        }
        hex.push(ungroupedHex);
        const randomColorString = '0x'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        // const randomColor = Phaser.Display.Color.HexStringToColor(randomColorString).color;
        // const connectedGroup = getAllHexesConnectedToByType(grid, ungroupedHex.x, ungroupedHex.y, ungroupedHex.type, [], randomColor);
        const connectedGroup = await getAllHexesConnectedToByType2(grid, ungroupedHex);
        // console.log(`x: ${ungroupedHex.x} y: ${ungroupedHex.y}, ${randomColorString}  ${connectedGroup.length}\n\t${JSON.stringify(connectedGroup.map(cg => [cg.x, cg.y]))}`);
        groups.push(connectedGroup);
    }
    // console.log(`${groups.flat().length} vs. ${grid.hexes.flat().length}`);
    return groups;
}

/*
    iteration:
    - while unsearchedHexes has
    odd rows are down, even rows are up

                    7,3
                6,4 7,4 8,4
                6,5 7,5 8,5

                5,3 6,3 7,3
                5,4 6,4 7,4
                    6,5

                5,4 6,4 7,4
                5,5 6,5 7,5
                    6,6
*/
async function getAllHexesConnectedToByType2(grid: Grid, hex: Hex, label: number = 100000): Promise<Hex[]> {
    // return [];
    let unSearchedHexes: Hex[] = [];
    let groupedHexes: Hex[] = [];
    unSearchedHexes.push(hex);
    var count = 0;
    while (unSearchedHexes.length > 0) {
        if (++count%500 === 0) {
            debugger
        }
        const focusedHex = unSearchedHexes.shift() as Hex;
        groupedHexes.push(focusedHex);
        const isEvenX = focusedHex.x % 2 === 0;
        const topCoords = { x: focusedHex.x, y: focusedHex.y - 1 };
        const topLeftCoords = { x: focusedHex.x - 1, y: focusedHex.y - (isEvenX ? 1 : 0) };
        const topRightCoords = { x: focusedHex.x + 1, y: focusedHex.y - (isEvenX ? 1 : 0) };
        const bottomCoords = { x: focusedHex.x, y: focusedHex.y + 1 };
        const bottomLeftCoords = { x: focusedHex.x - 1, y: focusedHex.y + (isEvenX ? 0 : 1) };
        const bottomRightCoords = { x: focusedHex.x + 1, y: focusedHex.y + (isEvenX ? 0 : 1) };
        const top = grid.hexes.flat().find(h => h.x === topCoords.x && h.y === topCoords.y) as Hex;
        const topLeft = grid.hexes.flat().find(h => h.x === topLeftCoords.x && h.y === topLeftCoords.y) as Hex;
        const topRight = grid.hexes.flat().find(h => h.x === topRightCoords.x && h.y === topRightCoords.y) as Hex;
        const bottom = grid.hexes.flat().find(h => h.x === bottomCoords.x && h.y === bottomCoords.y) as Hex;
        const bottomLeft = grid.hexes.flat().find(h => h.x === bottomLeftCoords.x && h.y === bottomLeftCoords.y) as Hex;
        const bottomRight = grid.hexes.flat().find(h => h.x === bottomRightCoords.x && h.y === bottomRightCoords.y) as Hex;
        const matchingSearches =  [top, topLeft, topRight, bottom, bottomLeft, bottomRight].filter(h => {
            return !!h 
                && h?.type === hex.type
                && !groupedHexes.includes(h)
                && !unSearchedHexes.includes(h)
        }) as Hex[];
        unSearchedHexes = unSearchedHexes.concat(matchingSearches);
        // await (new Promise(resolve => setTimeout(resolve, 10))).then(() => focusedHex.color = label );

        // console.log(`x: ${focusedHex.x} y: ${focusedHex.y}\n${unSearchedHexes.length}\n${groupedHexes.length}
        //     topLeft(${JSON.stringify(topLeftCoords)}) (${!!topLeft}): ${matchingSearches.includes(topLeft)}
        //     top(${JSON.stringify(topCoords)}) (${!!top}): ${matchingSearches.includes(top)}
        //     topRight(${JSON.stringify(topRightCoords)}) (${!!topRight}): ${matchingSearches.includes(topRight)}
        //     bottomRight(${JSON.stringify(bottomRightCoords)}) (${!!bottomRight}): ${matchingSearches.includes(bottomRight)}
        //     bottom(${JSON.stringify(bottomCoords)}) (${!!bottom}): ${matchingSearches.includes(bottom)}
        //     bottomLeft(${JSON.stringify(bottomLeftCoords)}) (${!!bottomLeft}): ${matchingSearches.includes(bottomLeft)}
        // `);
        // setTimeout(function(hex: Hex) {
        //     hex.gameObject?.setFillStyle(label);
        // }, 50000, focusedHex);
    }
    return groupedHexes;
}


/*
    termination condition: if type != hex.type
    well recurssion just isn't working for me
*/
function getAllHexesConnectedToByType(grid: Grid, x: number, y: number, type: HexType, connectedHexes: Hex[] = [], label: number): Hex[] {
    try {
        if (!inBounds(grid, x, y)) {
            return []
        }
        const hex = grid.hexes[y][x];
        if (hex.type != type) {
            return [];
        }
        if (connectedHexes.includes(hex)) {
            return [];
        }
        connectedHexes.push(hex);
        // mark
        // const state.scene.cache.bitmapFont.add("font", Phaser.GameObjects.RetroFont.Parse(scene, config));
        // const bitmaptext = state.scene.make.bitmapText({ font: "desyrel", text: label, size: 8 });
        // const bitmaptext = state.scene.add.bitmapText(200, 100, 'desyrel', label,64);

        /*
                5,3 6,3 7,3
                5,4 6,4 7,4
                    6,5

                    7,3
                6,4 7,4 8,4
                6,5 7,5 8,5

                5,4 6,4 7,4
                5,5 6,5 7,5
                    6,6
        */

        // const bitmapmask = bitmaptext.createBitmapMask();
        // hex.gameObject?.setMask(bitmapmask);
        // hex.gameObject?.setFillStyle(label);
        var topLeft = getAllHexesConnectedToByType(grid, x - 1, y - 1, type, connectedHexes, label);
        var sometimesTopLeft = getAllHexesConnectedToByType(grid, x - 1, y - 1, type, connectedHexes, label);
        var top = getAllHexesConnectedToByType(grid, x, y, type, connectedHexes, label);
        var topRight = getAllHexesConnectedToByType(grid, x + 1, y - 1, type, connectedHexes, label);
        var bottomRight = getAllHexesConnectedToByType(grid, x + 1, y, type, connectedHexes, label);
        var sometimesBottomRight = getAllHexesConnectedToByType(grid, x + 1, y + 1, type, connectedHexes, label);
        var bottom = getAllHexesConnectedToByType(grid, x, y + 1, type, connectedHexes, label);
        var bottomLeft = getAllHexesConnectedToByType(grid, x - 1, y + 1, type, connectedHexes, label);
        // console.log(`x: ${x} y: ${y},
        //     topLeft (${topLeft.length}): ${JSON.stringify(topLeft.map(cg => [cg.x, cg.y]))}
        //     top (${top.length}): ${JSON.stringify(top.map(cg => [cg.x, cg.y]))}
        //     topRight (${topRight.length}): ${JSON.stringify(topRight.map(cg => [cg.x, cg.y]))}
        //     bottomRight (${bottomRight.length}): ${JSON.stringify(bottomRight.map(cg => [cg.x, cg.y]))}
        //     bottom (${bottom.length}): ${JSON.stringify(bottom.map(cg => [cg.x, cg.y]))}
        //     bottomLeft (${bottomLeft.length}): ${JSON.stringify(bottomLeft.map(cg => [cg.x, cg.y]))}
        // `);
        var all = topLeft.concat(sometimesTopLeft).concat(top).concat(topRight).concat(bottomRight).concat(bottom).concat(bottomLeft).concat(sometimesBottomRight).concat([hex]);
        return all;
    } catch(e) {
        console.log(`${x}, ${y}\n${e}`);
    }
    return [];
}

// export function const findHexSearchingInCircularPattern(grid: Grid, startX: number, startY: number, )

export function getHexType(grid: Grid, x: number, y: number) {
    const spacesToOutside = getSpacesFromOutside(grid, x, y);
    let chanceLand;
    switch (spacesToOutside) {
        case 0:
            chanceLand = 0;
            break;
        case 1:
            chanceLand = .5;
            break;
        case 2:
            chanceLand = .6;
            break;
        case 3:
            chanceLand = .7;
            break;
        case 4:
            chanceLand = .8;
            break;
        case 5:
            chanceLand = .9;
            break;
        default:
            chanceLand = .99;
    }
    return Math.random() < chanceLand ? HexType.Land : HexType.Water;
}