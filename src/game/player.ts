import { Player } from "../models/player";
import { State } from "../models/state";

export function initializePlayers(state: State) {
    // create players
    for(var i = 0; i < 2; i++) {
        state.players.push(new Player(i));
    }
    // pick a location, ensure they it's on contiguous land
}