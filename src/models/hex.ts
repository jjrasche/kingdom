import { ItemType } from "./item";

export function sortHex(a: Hex, b: Hex): number {
    if (a.x < b.x) {
        return -1;
    } else if (a.y < b.y) {
        return -1;
    } 
    return 0;
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

    constructor(x: number, y: number, type: HexType, discoveredBy: number[] = [], visibleTo: number[] = [], ownedBy?: number, item?: ItemType) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.discoveredBy = discoveredBy;
        this.visibleTo = visibleTo;
        this.ownedBy = ownedBy;
        this.item = item;
    }
}