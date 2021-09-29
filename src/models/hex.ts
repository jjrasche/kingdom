import { ItemType } from "./item";

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

export enum HexType {
    Land,
    Water
}

export class Hex {
    x: number;
    y: number;
    type: HexType
    discoveredBy: number[] = [];
    visibleTo: number[] = [];
    ownedBy: number | undefined;
    item: ItemType | undefined;
    gameObject?: Phaser.GameObjects.Polygon;

    constructor(x: number, y: number, type: HexType, discoveredBy: number[] = [], visibleTo: number[] = [], ownedBy?: number, item?: ItemType) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.discoveredBy = discoveredBy;
        this.visibleTo = visibleTo;
        this.ownedBy = ownedBy;
        this.item = item;
    }

    set color(color: number) {
        this.gameObject?.setFillStyle(color);
    }
}