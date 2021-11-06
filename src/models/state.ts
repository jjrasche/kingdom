import { Scene } from "phaser";
import { renderGameObjects } from "../game/render";
import { Round } from "../game/round";
import { getPlayerHexes, Grid } from "./grid";
import { Hex } from "./hex";
import { ItemType } from "./item";
import { Player } from "./player";

export class State {
    scene: Scene;
    grid: Grid = new Grid();
    players: Player[] = [];
    selectedItemType?: ItemType;
    currentPlayer: Player;
    lastClickedHex: Hex;
    highlightedHexes: Hex[];
    rounds: Round[] = [];
}

export function getActivePlayers(state: State): Player[] {
    return state.players
        .filter(player => {
            const playerHexes = getPlayerHexes(state.grid, player);
            return !!playerHexes.find(hex => hex.item.type === ItemType.Castle);
        });
}

export function setCamera(state: State) {
    // set camera based on grid size and hexsize
    const cameraWidth = (state.grid.width ) * (state.grid.hexSize );             // this math doesn't make sense
    const cameraHeight = (state.grid.height + 4) * (state.grid.hexSize + 1);     // this math makes sense for setting camera y bounds to 2 hex's on each side 
    state.scene.cameras.main.setBounds(-2 * state.grid.hexSize, -2 * state.grid.hexSize, cameraWidth, cameraHeight);
    state.scene.cameras.main.setZoom(2);
    state.scene.cameras.main.centerToBounds();
}

export function highlightHexes(state: State, hexes: Hex[]) {
    state.highlightedHexes = hexes;
    renderGameObjects(state);
}