import { Scene } from 'phaser';

export const configObject: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        fullscreenTarget: undefined,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER,
        parent: 'thegame',
        width: "100%",
        height: "100%"
    },
};

export function createControls(scene: Scene): Phaser.Cameras.Controls.SmoothedKeyControl {
    const cursors = scene.input.keyboard.createCursorKeys()
    return new Phaser.Cameras.Controls.SmoothedKeyControl({
        camera: scene.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
        zoomOut: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    });
};