import { ItemType } from "./item";

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