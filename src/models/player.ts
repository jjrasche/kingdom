export enum PlayerType {
    Human,
    RandomLogic,
    BestLogic,
    AI
} 

const playerColors = ["0x2933AF", "0xF51C1C"]

export class Player {
    id: number;
    type: PlayerType;
    color: string;
    alive = true;

    constructor(id: number, type: PlayerType = PlayerType.BestLogic) {
        this.id = id;
        this.type = type;
        this.color = playerColors[id];
    }

}