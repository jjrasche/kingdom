import { randomBetween } from "../helpers/number";
import { Player } from "../models/player";
import { State } from "../models/state";

export function initializePlayers(state: State) {
    // create players
    for(var i = 0; i < 2; i++) {
        const player = new Player(i);
        state.players.push(player);
        const startingHex = state.grid.mainContinent[randomBetween(0, state.grid.mainContinent.length - 1)];
        startingHex.ownedBy = i;
        startingHex.color = player.color;
    }
    // pick a location, ensure they it's on contiguous land
}