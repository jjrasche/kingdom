import { PlayerColors } from "./colors";

export enum PlayerType {
    Human,
    RandomLogic,
    BestLogic,
    AI
} 

export class Player {
    id: number;
    type: PlayerType;
    color: number;
    alive = true;

    constructor(id: number, type: PlayerType = PlayerType.BestLogic) {
        this.id = id;
        this.type = type;
        this.color = PlayerColors[id];
    }

}
