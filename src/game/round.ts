import { getSerializableMap } from "../models/grid";
import { Hex } from "../models/hex";
import { ItemType } from "../models/item";
import { Player } from "../models/player";
import { getActivePlayers, highlightHexes, State } from "../models/state";
import { Action, getActionHexes } from "./action";

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

export function executeRound(state: State) {
    const round = {
        num: state.rounds.length + 1,
        players: getActivePlayers(state)
    } as Round;

    round.players.forEach(player => {
        state.currentPlayer = player;
        const turn = {
            startMap: getSerializableMap(state.grid),
            startingMoney: player.money
            // moves
        } as Turn;
        player.strategy.takeTurn(state, turn);
        turn.endingMoney = player.money;
        turn.endMap = getSerializableMap(state.grid);
        // debugPlaceSpace(state, getAllPlaceableItemPlacements(state));
        // debugMoveSpace(state, getAllPosibbleMoves(state));
    })
}

function debugMoveSpace(state: State, actionSpace: Action[]) {
    // setup debugging
    var nextKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    const actionsByItem = actionSpace.groupBy((a: Action) => JSON.stringify(a.start));
    const keys = Object.keys(actionsByItem);
    var count = 0;
    nextKey.on('down', () => {
        const key = keys[count++];
        if (count > keys.length - 1) {
            count = 0;
        }
        const itemActionSpace = actionsByItem[key];
        highlightHexes(state, getActionHexes(state, itemActionSpace));
        console.log(`highlighted where ${ItemType[itemActionSpace[0].item.type]} starting at ${key} can MOVE`);
    });
    // get out of debugging
    var stopKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    stopKey.on('down', () => {
        state.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.N);
        state.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
    });
}

function debugPlaceSpace(state: State, actionSpace: Action[]) {
    // setup debugging
    var nextKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    const actionsByItem = actionSpace.groupBy((a: Action) => JSON.stringify(a.item));
    const keys = Object.keys(actionsByItem);
    var count = 0;
    nextKey.on('down', () => {
        const key = keys[count++];
        if (count > keys.length - 1) {
            count = 0;
        }
        const itemActionSpace = actionsByItem[key];
        highlightHexes(state, getActionHexes(state, itemActionSpace));
        console.log(`highlighted possible actions to PLACE ${ItemType[itemActionSpace[0].item.type]}`);
    });
    // get out of debugging
    var stopKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    stopKey.on('down', () => {
        state.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.N);
        state.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
    });
}
