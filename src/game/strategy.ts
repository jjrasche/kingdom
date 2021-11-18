import { getCurrentPlayerItemHexes, ItemType } from "../models/item";
import { State } from "../models/state";
import { Action, getAllPlaceableItemPlacements, getHexItemMoves } from "./action";
import { Turn } from "./round";

/*
    given a Turn will make moves
*/
export abstract class Strategy {
    // make moves until no additional moves possible
    abstract takeTurn(state: State, turn: Turn): Promise<void>
}


export class RandomStrategy extends Strategy {
    async takeTurn(state: State, turn: Turn) {
        // move every movable item randomly
        const playerItemHexes = getCurrentPlayerItemHexes(state);
        for (let i = 0; i < playerItemHexes.length; i++) {
            const moves = getHexItemMoves(playerItemHexes[i], state);
            const move = moves.random();
            if (!!move) {
                await move.take(state);
            }
        }

        // make one placement if one is possible
        const placements = getAllPlaceableItemPlacements(state);
        const ptypes = placements.map(p => ItemType[p.item.type]);
        const place = placements.random();
        if (!!place) {
            await place.take(state);
        }
        console.log("-------------------------------------");
    }
}