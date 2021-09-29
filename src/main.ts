/*
    TODO:
    - write tests for getting all main continent hexes
    - set starting location and display on map
    - setup hotkeys for units
    - create d
*/
import { Scene } from 'phaser';
import { configObject, createControls } from './config';
import { createRandomMap, getConectedHexGroupsByType } from './game/map';
import { initializePlayers } from './game/player';
import { renderGrid } from './game/render';
import { Grid } from './models/grid';
import { HexType } from './models/hex';
import { State } from './models/state';
import "./helpers/number";

export let state: State = new State();

class PlayGame extends Scene {
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

    constructor() {
        super("PlayGame");
    }
    preload(): void {
        this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');

    }
    async create(): Promise<void> {     
        state.scene = this;
        await createRandomMap(state.grid);
        renderGrid(state);
        initializePlayers(state);
        this.controls = createControls(this);
    }
    async update(time: number, deltaTime: number) {
        if (!!this.controls) {
            this.controls.update(deltaTime)
        }
    }
}

new Phaser.Game({ ...configObject, scene: PlayGame });
