import { randomBetween } from "../helpers/number";
import { setHexColor } from "../models/colors";
import { getMainContinent } from "../models/grid";
import { ItemType } from "../models/item";
import { Player } from "../models/player";
import { State } from "../models/state";
import { getRandomAttachedHexGroup } from "./map";

export function initializePlayers(state: State) {
    const mainContinent = getMainContinent(state.grid)
    for(var i = 0; i < 1; i++) {
        const player = new Player(i);
        state.players.push(player);
        // pick random starting spot
        const startingHex = mainContinent[randomBetween(0, mainContinent.length - 1)];
        startingHex.itemType = ItemType.Castle;
        // create initial starting area
        const startingHexGroup = getRandomAttachedHexGroup(5, startingHex, state.grid);
        startingHexGroup.forEach(hex => {
            hex.ownedBy = i;
            setHexColor(hex, player.phaserColor); 
        });
    }
}
