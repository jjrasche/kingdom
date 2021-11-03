import { getSerializableMap } from "../models/grid";
import { Hex, Position } from "../models/hex";
import { ItemType } from "../models/item";
import { Player } from "../models/player";
import { getActivePlayers, State } from "../models/state";

/*
    beginning of round
    - add all players with a castle
    - iterate through players, making decisions
        - set starting map
        - make a move
*/
export interface Round {
    num: number;
    players: Player[];
    turns: { [key: number]: Turn }
    
}

export interface Turn {
    startMap: Hex[][];
    startingMoney: number;
    endingMoney: number;
    moves: Action[];
    endMap: Hex[][];
}

export interface Action {
    item: ItemType
    position: Position
}

export interface Move extends Action {
    start: Position;   // undefined if added item
}

export interface Place extends Action {
    cost: number;
}

export function executeRound(state: State) {
    const round = {
        num: state.rounds.length + 1,
        players: getActivePlayers(state)
    } as Round;

    round.players.forEach(player => {
        const turn = {
            startMap: getSerializableMap(state.grid),
            startingMoney: player.money
            // moves
        } as Turn;
    })
}

/*
    unique movements to moves
    - for all player items then add action for every hex they can move to and all the hexes they can move to
    - for all items a player can afford add action for every hex that item can be placed on
*/
export getAllPossibleMoves() {
``
}