import { Action, Turn } from "./round";

/*
    given a Turn will make moves
*/
export abstract class Strategy {
    // make moves until no additional moves possible
    takeTurn(turn: Turn) {
        while 
    }

    abstract makeMove(turn: Turn): Action;
}


export class StrategyRandom extends Strategy {
    /*
        TODO:
        - build getAllMoves(turn: Turn) => Moves
    */
    makeMove(turn: Turn): Action {
        return {} as Action;
    }
}