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
import { renderGameObjects, renderGrid } from './game/render';
import { Grid } from './models/grid';
import { HexType } from './models/hex';
import { setCamera, State } from './models/state';
import "./helpers/number";

export let state: State = new State();

class PlayGame extends Scene {
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

    constructor() {
        super("PlayGame");
    }
    preload(): void {
        this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
        this.load.image("castle", "assets/castle.png");
        this.load.image("grave", "assets/grave.png");
        this.load.image("house", "assets/house.png");
        this.load.image("man0", "assets/man0.png");
        this.load.image("man1", "assets/man1.png");
        this.load.image("man2", "assets/man2.png");
        this.load.image("man3", "assets/man3.png");
        this.load.image("palm", "assets/palm.png");
        this.load.image("pine", "assets/pine.png");
        this.load.image("tower", "assets/tower.png");
        this.load.image("strongTower", "assets/strong_tower.png");
    }
    async create(): Promise<void> {     
        state.scene = this;
        await createRandomMap(state.grid);
        renderGrid(state);
        initializePlayers(state);
        renderGameObjects(state);
        setCamera(state);
        this.controls = createControls(this);
    }
    async update(time: number, deltaTime: number) {
        if (!!this.controls) {
            this.controls.update(deltaTime)
        }
    }
}

new Phaser.Game({ ...configObject, scene: PlayGame });
