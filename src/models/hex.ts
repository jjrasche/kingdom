import { ItemType } from "./item";

export class Hex {
    discoveredBy: number[] = [];
    visibleTo: number[] = [];
    ownedBy: number;
    item: ItemType;
}