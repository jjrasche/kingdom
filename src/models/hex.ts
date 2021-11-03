import { randomBetween } from "../helpers/number";
import { Grid, lineWidth } from "./grid";
import { ItemType } from "./item";
import { Line, Point } from "./line";
import { Player } from "./player";
import { State } from "./state";

export const top = (hex: Hex, hexes: Hex[]): Hex | undefined => hexes.find(h => h.x === hex.x && h.y === hex.y - 1);
export const topLeft = (hex: Hex, hexes: Hex[]): Hex | undefined => hexes.find(h => h.x === hex.x - 1 && h.y === hex.y - (hex.x % 2 === 0 ? 1 : 0));
export const topRight = (hex: Hex, hexes: Hex[]): Hex | undefined => hexes.find(h => h.x === hex.x + 1 && h.y === hex.y - (hex.x % 2 === 0 ? 1 : 0));
export const bottom = (hex: Hex, hexes: Hex[]): Hex | undefined => hexes.find(h => h.x === hex.x && h.y === hex.y + 1);
export const bottomLeft = (hex: Hex, hexes: Hex[]): Hex | undefined => hexes.find(h => h.x === hex.x - 1 && h.y === hex.y + (hex.x % 2 === 0 ? 0 : 1));
export const bottomRight = (hex: Hex, hexes: Hex[]): Hex | undefined => hexes.find(h => h.x === hex.x + 1 && h.y === hex.y + (hex.x % 2 === 0 ? 0 : 1));

export const getRandomAttachedHexOfSameType = (hex: Hex, hexes: Hex[]): Hex | undefined => {
    const sameTypeHexes = getAdjacentHexes(hex, hexes).filter(h => h.type === hex.type);
    if (sameTypeHexes.length !== 0) {
        return sameTypeHexes[randomBetween(0, sameTypeHexes.length - 1)];
    }
}

export const getAdjacentHexes = (hex: Hex, hexes: Hex[]): Hex[] => {
    const top1 = top(hex, hexes);
    const topLeft1 = topLeft(hex, hexes);
    const topRight1 = topRight(hex, hexes);
    const bottom1 = bottom(hex, hexes);
    const bottomLeft1 = bottomLeft(hex, hexes);
    const bottomRight1 = bottomRight(hex, hexes);
    return [
    	top1,
		topLeft1,
		topRight1,
		bottom1,
		bottomLeft1,
		bottomRight1,
    ].filter(hex => !!hex) as Hex[];
}

export function isOwnedByPlayer(hex: Hex, player: Player): boolean {
    return player.id === hex.ownedBy;
}

export enum HexType {
    Land,
    Water
}

export class Hex {
    position: Position;
    type: HexType;
    discoveredBy: number[] = [];
    visibleTo: number[] = [];
    ownedBy: number;
    item: ItemType;
    gameObject: Phaser.GameObjects.Polygon;

    constructor(x: number, y: number, type: HexType, ownedBy?: number, discoveredBy: number[] = [], visibleTo: number[] = [], item?: ItemType) {
        this.position = new Position(x, y);
        this.type = type;
        this.discoveredBy = discoveredBy;
        this.visibleTo = visibleTo;
        this.ownedBy = ownedBy!;
        this.item = item!;
    }
}

export class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export function getPointsInGameSpace(hex: Hex): Point[] {
    return hex.gameObject.geom.points.map((point: Phaser.Geom.Point) => {
        return {
            x: point.x + hex.gameObject.x,// + (hex.x * (lineWidth - 1)),
            y: point.y + hex.gameObject.y - (hex.y - lineWidth)
        } as Point;
    });
}

export function getLinesInGameSpace(hex: Hex): Line[] {
    const points = getPointsInGameSpace(hex);
    const lines = points.map((point: Point, idx: number) => {
        return {
            p1: point,
            p2: idx === (points.length - 1) ? points[0] : points[idx+1]
        } as Line;
    }).flat();
    return lines;
}

export function getLineObjectsStringFromHex(hex: Hex): string {
    var ret = "";
    const lines = getLinesInGameSpace(hex);
    lines.forEach(line => {
        ret += `${getLineObjectString(line)}\n`
    });
    return ret;
}

export function getLineObjectString(line: Line): string {
    return `{ p1: {x: ${line.p1.x}, y: ${line.p1.y}}, p2: {x: ${line.p2.x}, y: ${line.p2.y}} } as Line`;
}

export function sortHexArray(a: Hex, b: Hex): number {
    if (a.x != b.x) {
        return a.x - b.x;
    } else {
        return a.y - b.y;
    }
}

export function sort2DHexArray(a: Hex[], b: Hex[]): number {
    if (a.length < b.length) {
        return -1;
    }
    return sortHexArray(a[0], b[0]);
}

