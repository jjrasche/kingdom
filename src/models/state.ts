import { Scene } from "phaser";
import { Grid } from "./grid";
import { Player } from "./player";

export class State {
    scene: Scene;
    grid: Grid = new Grid();
    players: Player[] = [];
}