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
import { renderGrid } from './game/render';
import { State } from './models/state';

export let state: State = new State();

class PlayGame extends Scene {
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

    constructor() {
        super("PlayGame");
    }
    preload(): void {
    }
    create(): void {     
        createRandomMap(state);
        renderGrid(state, this);
        initializePlayers(state);
        this.controls = createControls(this);
    }
    update(time: number, deltaTime: number) {
        this.controls.update(deltaTime)
    }
}

new Phaser.Game({ ...configObject, scene: PlayGame });
