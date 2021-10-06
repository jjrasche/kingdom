import { randomBetween } from "../helpers/number";
import { getMainContinent } from "../models/grid";
import { ItemType } from "../models/item";
import { Player } from "../models/player";
import { State } from "../models/state";
import { getRandomAttachedHexGroup } from "./map";

export function initializePlayers(state: State) {
    // create players
    const mainContinent = getMainContinent(state.grid)
    for(var i = 0; i < 2; i++) {
        const player = new Player(i);
        state.players.push(player);
        const startingHex = mainContinent[randomBetween(0, mainContinent.length - 1)];
        startingHex.item = ItemType.castle;

        const startingHexGroup = getRandomAttachedHexGroup(5, startingHex, state.grid);
        startingHexGroup.forEach(hex => {
            hex.ownedBy = i;
            hex.color = player.color; 
        });
    }
    // pick a location, ensure they it's on contiguous land
}