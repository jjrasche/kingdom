export enum PlayerType {
    Human,
    RandomLogic,
    BestLogic,
    AI
} 

export class Player {
    id: number;
    type: PlayerType;
    color: "blue";
    alive = true;
}