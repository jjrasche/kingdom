import { Strategy } from "../game/strategy";
import { PlayerColors } from "./colors";

export enum PlayerType {
    Human,
    NPC
} 

export class Player {
    id: number;
    type: PlayerType;
    strategy: Strategy;
    money: number;
    phaserColor: Phaser.Display.Color;
    alive = true;

    constructor(id: number, type: PlayerType = PlayerType.NPC, strat) {
        this.id = id;
        this.type = type;
        this.phaserColor = PlayerColors[id];
    }
}
