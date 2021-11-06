import { randomBetween } from "../helpers/number";
import { getLighterHexColor, setHexColor } from "../models/colors";
import { Grid } from "../models/grid";
import { Hex, HexType, getRandomAttachedHexOfSameType, getAdjacentHexes, getPointsInGameSpace, Position } from "../models/hex";
import { State } from "../models/state";


export async function createRandomMap(grid: Grid) {
    for (let y = 0; y < grid.height; y++) {
        grid.hexes[y] = [];
        for (let x = 0; x < grid.width; x++) {
            grid.hexes[y][x] = new Hex(x, y, getHexType(grid, x, y));
        }
    }
    grid.connectedHexes = await getConectedHexGroupsByType(grid.hexes.flat());
}

export function getSpacesFromOutside(grid: Grid, x: number, y: number): number {
    // -1 for array being 0-indexed 
    const verticalDistance = y < ((grid.height - 1) / 2) ? y : Math.abs(grid.height - y - 1);  
    const horizontalDistance = x < ((grid.width - 1) / 2) ? x : Math.abs(grid.width - x - 1);  
    return Math.min(verticalDistance, horizontalDistance)
}

export function getDistanceBetweenHexes(hex1: Hex, hex2: Hex): number {
    const horizontalDistance = Math.abs(hex1.x - hex2.x);
    const verticalDistance = Math.abs(hex1.y - hex2.y);
    const diagonalDistance = Math.abs( (-hex1.x + -hex1.y) - (-hex2.x + -hex2.y));
    return Math.max(horizontalDistance, verticalDistance, diagonalDistance);
}

export function breadthFirstSearch(hex1: Hex, hex2: Hex, map: Hex[]): number {
    const frontier = [hex1];
    const cameFrom: { [key: string]: string } = { };
    while (frontier.length > 0) {
        const curr = frontier.pop() as Hex;
        const neighbors = getAdjacentHexes(curr, map);
        neighbors.forEach(neighbor => {
            if (!cameFrom[neighbor.toString()]) {
                frontier.unshift(neighbor);
                cameFrom[neighbor.toString()] = curr.toString();
            }
        });
    }
    
    let distance = 0;
    let hexString = hex2.toString();
    while (hexString != hex1.toString()) {
        const newHexString = cameFrom[hexString];
        hexString = newHexString;
        distance++;
    }
    return distance;
}


export function getConectedHexGroupsByType(hexes: Hex[]): Hex[][] {
    return getConectedHexGroups(hexes, (hex: Hex, compareHex: Hex) => hex.type === compareHex.type);
}

export function getConectedHexGroups(hexes: Hex[], inGroupMethod?: (hex: Hex, compareHex: Hex) => boolean): Hex[][] {
    let groups: Hex[][] = [];
    const hex = []
    while (groups.flat().length < hexes.length) {
        const ungroupedHexs = hexes.filter(hex => !groups.flat().includes(hex));
        const ungroupedHex = ungroupedHexs[0];
        if (!ungroupedHex) {
            continue;
        }
        hex.push(ungroupedHex);
        const connectedGroup = getConnectedHexes(ungroupedHex, hexes, inGroupMethod);
        groups.push(connectedGroup);
    }
    return groups;
}

function getConnectedHexes(hex: Hex, hexes: Hex[], inGroupMethod?: (hex: Hex, compareHex: Hex) => boolean, label?: number): Hex[] {
    let unSearchedHexes: Hex[] = [];
    let groupedHexes: Hex[] = [];
    unSearchedHexes.push(hex);
    var count = 0;
    while (unSearchedHexes.length > 0) {
        if (++count%500 === 0) {
            debugger
        }
        const hexToSearch = unSearchedHexes.shift() as Hex;
        groupedHexes.push(hexToSearch);
        const adjacentTiles = getAdjacentHexes(hexToSearch, hexes);
        const matchingSearches = adjacentTiles.filter(h => {
            const t = (!inGroupMethod || inGroupMethod(h, hex));
            const u =  !groupedHexes.includes(h)
                && !unSearchedHexes.includes(h);
            return t && u;
        }) as Hex[];
        unSearchedHexes = unSearchedHexes.concat(matchingSearches);
        // await (new Promise(resolve => setTimeout(resolve, 10))).then(() => hex.color = label );
    }
    return groupedHexes;
}

export function getRandomAttachedHexGroup(numHexes: number, startingHex: Hex, grid: Grid): Hex[] {
    const attachedHexes = [startingHex];
    while (numHexes > 0) {
        const randomHexInGroup = attachedHexes[randomBetween(0, attachedHexes.length - 1)];
        const attached = getRandomAttachedHexOfSameType(randomHexInGroup, grid.hexes.flat());
        // todo: can still isolate part of an opponents land
        if (!!attached && attached.ownedBy == null && attached.type === startingHex.type && !attachedHexes.includes(attached)) {
            attachedHexes.push(attached);
            console.log(`+ (${attached.x},${attached.y})`);
        } else {
            continue;
        }
        numHexes--;
    }
    return attachedHexes;
};


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
    // return Math.random() < chanceLand ? HexType.Land : HexType.Water;
    return HexType.Land;
}

export function setMapInteraction(hex: Hex, state: State) {
    hex.gameObject.setInteractive()
    .on('pointerdown', () => handleHexPointerDown(hex, state))
    .on('pointerup', () => handleHexPointerUp(hex, state));
}

export const handleHexPointerDown = (hex: Hex, state: State) => {
    // console.log(`x:${hex.x}, y: ${hex.y}\n${getLineObjectsStringFromHex(hex)}`);
    console.log(`x:${hex.x}, y: ${hex.y}\n${JSON.stringify(getPointsInGameSpace(hex))}`);
    setHexColor(hex, getLighterHexColor(hex, state, 20));
    state.lastClickedHex = hex;
}

export const handleHexPointerUp = (hex: Hex, state: State) => {
}

