import { Grid } from "./grid";
import { Player } from "./player";

export class State {
    grid: Grid = new Grid();
    players: Player[] = [];
}