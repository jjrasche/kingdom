import { randomBetween } from "../helpers/number";
import { Grid, inBounds } from "../models/grid";
import { top, bottom, bottomLeft, bottomRight, Hex, HexType, topLeft, topRight, getRandomAttachedHexOfSameType } from "../models/hex";


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
        const hex = unSearchedHexes.shift() as Hex;
        groupedHexes.push(hex);
        const matchingSearches =  [
            top(hex, grid),
            topLeft(hex, grid),
            topRight(hex, grid),
            bottom(hex, grid),
            bottomLeft(hex, grid),
            bottomRight(hex, grid)
        ].filter(h => {
            return !!h 
                && h?.type === hex.type
                && !groupedHexes.includes(h)
                && !unSearchedHexes.includes(h)
        }) as Hex[];
        unSearchedHexes = unSearchedHexes.concat(matchingSearches);
        // await (new Promise(resolve => setTimeout(resolve, 10))).then(() => hex.color = label );

        // console.log(`x: ${hex.x} y: ${hex.y}\n${unSearchedHexes.length}\n${groupedHexes.length}
        //     topLeft(${JSON.stringify(topLeftCoords)}) (${!!topLeft}): ${matchingSearches.includes(topLeft)}
        //     top(${JSON.stringify(topCoords)}) (${!!top}): ${matchingSearches.includes(top)}
        //     topRight(${JSON.stringify(topRightCoords)}) (${!!topRight}): ${matchingSearches.includes(topRight)}
        //     bottomRight(${JSON.stringify(bottomRightCoords)}) (${!!bottomRight}): ${matchingSearches.includes(bottomRight)}
        //     bottom(${JSON.stringify(bottomCoords)}) (${!!bottom}): ${matchingSearches.includes(bottom)}
        //     bottomLeft(${JSON.stringify(bottomLeftCoords)}) (${!!bottomLeft}): ${matchingSearches.includes(bottomLeft)}
        // `);
        // setTimeout(function(hex: Hex) {
        //     hex.gameObject?.setFillStyle(label);
        // }, 50000, hex);
    }
    return groupedHexes;
}

export function getRandomAttachedHexGroup(numHexes: number, startingHex: Hex, grid: Grid): Hex[] {
    const attachedHexes = [startingHex];
    while (numHexes > 0) {
        const randomHexInGroup = attachedHexes[randomBetween(0, attachedHexes.length - 1)];
        const attached = getRandomAttachedHexOfSameType(randomHexInGroup, grid);
        if (!!attached) {
            attachedHexes.push(attached);
        } else {
            continue;
        }
        numHexes--;
    }
    return attachedHexes;
};

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