/*
    TODO:
    - write tests for getting all main continent hexes
    - set starting location and display on map
    - setup hotkeys for units
    - create d
*/
import { Scene } from 'phaser';
import { configObject, createControls } from './config';
import { createRandomMap } from './game/map';
import { initializePlayers } from './game/player';
import { renderGameObjects, renderGrid } from './game/render';
import  './models/colors';
import { setCamera, State } from './models/state';
import "./helpers/number";
import "./extensions/array.extensions";
import { testGrid } from './game/map.spec.data';
import { Player } from './models/player';
import { ItemType } from './models/item';

export let state: State = new State();

class PlayGame extends Scene {
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

    constructor() {
        super("PlayGame");
    }
    preload(): void {
        this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
        this.load.image(ItemType[ItemType.Castle], "assets/castle.png");
        this.load.image(ItemType[ItemType.Grave], "assets/grave.png");
        this.load.image(ItemType[ItemType.House], "assets/house.png");
        this.load.image(ItemType[ItemType.Man0], "assets/man0.png");
        this.load.image(ItemType[ItemType.Man1], "assets/man1.png");
        this.load.image(ItemType[ItemType.Man2], "assets/man2.png");
        this.load.image(ItemType[ItemType.Man3], "assets/man3.png");
        this.load.image(ItemType[ItemType.Palm], "assets/palm.png");
        this.load.image(ItemType[ItemType.Pine], "assets/pine.png");
        this.load.image(ItemType[ItemType.Tower], "assets/tower.png");
        this.load.image(ItemType[ItemType.StrongTower], "assets/strong_tower.png");
    }
    async create(): Promise<void> {     
        state.scene = this;
        // await createRandomMap(state.grid);
        // testing
        state.grid = testGrid;
        state.players.push(new Player(0));
        state.currentPlayer = state.players[0];

        renderGrid(state);
        // initializePlayers(state);
        setCamera(state);
        this.controls = createControls(state);
        renderGameObjects(state);
    }
    async update(time: number, deltaTime: number) {
        if (!!this.controls) {
            this.controls.update(deltaTime)
        }
    }
}

new Phaser.Game({ ...configObject, scene: PlayGame });
