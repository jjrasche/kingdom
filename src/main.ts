// import { render } from "./render";

// export let CANVAS: HTMLCanvasElement;
// export let CTX: CanvasRenderingContext2D;
// // old approach with canvas
// // function startGame() {
// //     initCanvas();
// //     setCanvasDimensions();
// //     render();
// // }

// // function initCanvas(): void {
// //     CANVAS = document.getElementById("canvas") as HTMLCanvasElement;
// //     CTX = CANVAS.getContext("2d") ?? new CanvasRenderingContext2D();
// //     CTX.imageSmoothingEnabled = false;
// // }

// // function setCanvasDimensions(): void {
// //     CANVAS.style.width = `${window.innerWidth}px`;
// //     CANVAS.style.height = `${window.innerHeight}px`;
// //     CANVAS.width = Math.floor(window.innerWidth * window.devicePixelRatio);
// //     CANVAS.height = Math.floor(window.innerHeight * window.devicePixelRatio);
// // }

// // startGame();

// import "phaser";

// class PlayGame extends Scene {
//     image: GameObjects.Image;
//     constructor() {
//         super("PlayGame");
//     }
//     preload(): void {
//         this.load.image('logo', 'assets/phaser3-logo.png');    
//     }
//     create(): void {
//         this.image = this.add.image(400, 300, 'logo');
//     }
//     update(): void {
//         this.image.rotation += 0.01;   
//     }
// }

// let configObject: Types.Core.GameConfig = {
//     scale: {
//         mode: Scale.FIT,
//         autoCenter: Scale.CENTER_BOTH,
//         parent: 'thegame',
//         width: 800,
//         height: 600
//     },
//     scene: PlayGame
// };

// new Game(configObject);

import { Game, GameObjects, Scale, Scene, Types } from 'phaser';
import { Grid } from './models/grid';
import { Hex, HexType } from './models/hex';
import { State } from './models/state';

class PlayGame extends Scene {
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl
    private state: State = new State();

    constructor() {
        super("PlayGame");
    }
    preload(): void {
    }
    create(): void {
        // var g2 = this.add.grid(300, 340, window.outerWidth, window.outerHeight, 30, 30, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        // this.gridContainer = this.add.container(100, 100)
        this.cameras.main.setBounds(0, 0, 1024, 2048);
        this.cameras.main.setZoom(2);
        this.cameras.main.centerOn(0, 0);
        
        this.createRandomMap();
        this.drawHexGrid();

        const cursors = this.input.keyboard.createCursorKeys()
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        })

    }
    update(time: number, deltaTime: number) {
        this.controls.update(deltaTime)
    }

    private createRandomMap() {
        this.state.grid = new Grid(10, 10);
        for (let x = 0; x < this.state.grid.width; x++) {
            this.state.grid.Hexes[x] = [];
            for (let y = 0; y < this.state.grid.height; y++) {
                this.state.grid.Hexes[x][y] = new Hex(x, y, this.getHexType(x, y));
            }
        }
    }

    /*
        height = 5
        y   ret
        0   0
        1   1
        2   2
        3   2
        4   1
        5   0
        ret = |y - height|
    */
    private getSpacesFromOutside(x: number, y: number): number {
        const verticalDistance = y < (this.state.grid.height / 2) ? y : Math.abs(this.state.grid.height - y);  
        const horizontalDistance = x < (this.state.grid.width / 2) ? x : Math.abs(this.state.grid.width - x);  
        return Math.min(verticalDistance, horizontalDistance)
    }

    private getHexType(x: number, y: number) {
        const spacesToOutside = this.getSpacesFromOutside(x, y);
        let chanceLand;
        switch (spacesToOutside) {
            case 0:
                chanceLand = 0;
                break;
            case 1:
                chanceLand = .3;
                break;
            case 2:
                chanceLand = .4;
                break;
            case 3:
                chanceLand = .6;
                break;
            case 4:
                chanceLand = .8;
                break;
            case 5:
                chanceLand = .9;
                break;
            default:
                chanceLand = .95;
        }
        return Math.random() < chanceLand ? HexType.Land : HexType.Water;
    }

    private drawHexGrid() {
        // https://mobsor.com/blog/2020/06/creating-an-interactive-hexagon-grid-in-phaser/
        var hexSize = 50;
        var landHexColor = 0x49D163;
        var waterHexColor = 0x7CADD7;
        var selectedHexColor = 0x3000ff;
        var lineColor = 0xef15ff;
        var lineWidth = 1;
        const longestDiagonal = this.getLongestDiagonal(hexSize);
        let hexCoords: number[] = this.getHexCoords(hexSize);
        for (let x: number = 0; x <= this.state.grid.width - 1; x++) {
            for (let y: number = 0; y <= this.state.grid.height - 1; y++) {
                var hexData = this.state.grid.Hexes[x][y];
                // TODO: some of the edges aren't ligning up, I think due to floating point accuracy of the engine.
                let hexX = x * longestDiagonal              // move right to colum x
                    - x * longestDiagonal / 4               // move back to align top left-side with previous hex's bottom-right side
                    + (x * (lineWidth - 1));                    // move right for every line width between row
                // let hexX = x * hexSize - (x * (hexSize / 9));

                let hexY = y * hexSize                      // move down to row y
                    + (x % 2 === 1 ? hexSize / 2 : 0)     // move down half row every other column
                    + (y * (lineWidth));                    // move down for every line width between row

                let hexColor = hexData.type === HexType.Land ? landHexColor : waterHexColor;
                let hex1 = this.add.polygon(hexX, hexY, hexCoords, hexColor).setOrigin(0, 0);
                hex1.setStrokeStyle(lineWidth, 0xefc53f);
                hex1.setData('painted', false);
                hex1.setData('color', hexColor);
                hex1.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
                    console.log('click x:' + x + ' y:' + y);
                    hex1.data.values.painted = !hex1.data.values.painted;
                    hex1.setStrokeStyle(20, lineColor);
                    hex1.setFillStyle(hex1.data.values.painted ? selectedHexColor : hexColor);
                }).on('pointerup', () => {
                    hex1.setStrokeStyle(lineWidth, 0xefc53f);
                });
                // this.gridContainer.add(hex1);
            }
        }
    }

    private getLongestDiagonal(hexSize: number): number {
        return (4 * (hexSize / 2 / Math.sqrt(3)));
    }

    private getHexCoords(hexSize: number): number[] {
        //http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
        let longestDiagonal = this.getLongestDiagonal(hexSize);
        let y: number = hexSize / 2;
        let verticesCoordinates: number[] = [
            0, y,                                       // left-most vertex
            longestDiagonal / 4, 0,                     // top-left vertex 
            longestDiagonal * 3 / 4, 0,                 // top-right vertex 
            longestDiagonal, y,                         // right-most vertex
            longestDiagonal * 3 / 4, 2 * y,             // bottom-right vertex
            longestDiagonal / 4, 2 * y                  // bottom-left vertex
        ];
        return verticesCoordinates;
    }
}

let configObject: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        fullscreenTarget: undefined,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER,
        parent: 'thegame',
        width: "100%",
        height: "100%"
    },
    scene: PlayGame
};

new Phaser.Game(configObject);
