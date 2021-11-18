import { getCurrentPlayerItemHexes, ItemType } from "../models/item";
import { State } from "../models/state";
import { Action, getAllPlaceableItemPlacements, getHexItemMoves } from "./action";
import { Turn } from "./round";

/*
    given a Turn will make moves
*/
export abstract class Strategy {
    // make moves until no additional moves possible
    abstract takeTurn(state: State, turn: Turn): void
}


export class RandomStrategy extends Strategy {
    takeTurn(state: State, turn: Turn) {
        // move every movable item randomly
        const playerItemHexes = getCurrentPlayerItemHexes(state);
        playerItemHexes.forEach(itemHex => {
            const moves = getHexItemMoves(itemHex, state);
            const move = moves.random();
            if (!!move) {
                console.log(move.toString());
                move.take(state);
            }
        });
     
        // make one placement if one is possible
        const placements = getAllPlaceableItemPlacements(state);
        const ptypes = placements.map(p => ItemType[p.item.type]);
        const place = placements.random();
        if (!!place) {
            console.log(place.toString());
            place.take(state);
        }
        console.log("-------------------------------------");
    }
}