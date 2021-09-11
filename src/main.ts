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

import { Scene } from 'phaser';
import { Grid } from './models/grid';
import { Hex, HexType } from './models/hex';
import { Player } from './models/player';
import { State } from './models/state';

class PlayGame extends Scene {
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl
    private state: State = new State();
    private readonly hexSize = 25;

    constructor() {
        super("PlayGame");
    }
    preload(): void {
    }
    create(): void {
        // var g2 = this.add.grid(300, 340, window.outerWidth, window.outerHeight, 30, 30, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        // this.gridContainer = this.add.container(100, 100)        
        this.createRandomMap();
        this.drawHexGrid();
        this.setCamera();
        this.initializePlayers();

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
        this.state.grid = new Grid(32,18);
        for (let x = 0; x < this.state.grid.width; x++) {
            this.state.grid.Hexes[x] = [];
            for (let y = 0; y < this.state.grid.height; y++) {
                this.state.grid.Hexes[x][y] = new Hex(x, y, this.getHexType(x, y));
            }
        }
    }

    private initializePlayers() {
        // create players
        for(var i = 0; i < 2; i++) {
            this.state.players.push(new Player(i));
        }
        // pick a location, ensure they it's on contiguous land


    }

    private setCamera() {
        // set camera based on grid size and hexsize
        const cameraWidth = (this.state.grid.width ) * (this.hexSize );             // this math doesn't make sense
        const cameraHeight = (this.state.grid.height + 4) * (this.hexSize + 1);     // this math makes sense for setting camera y bounds to 2 hex's on each side 
        this.cameras.main.setBounds(-2 * this.hexSize, -2 * this.hexSize, cameraWidth, cameraHeight);
        this.cameras.main.setZoom(2);
        this.cameras.main.centerToBounds();
    }

    private getSpacesFromOutside(x: number, y: number): number {
        // -1 for array being 0-indexed 
        const verticalDistance = y < ((this.state.grid.height - 1) / 2) ? y : Math.abs(this.state.grid.height - y - 1);  
        const horizontalDistance = x < ((this.state.grid.width - 1) / 2) ? x : Math.abs(this.state.grid.width - x - 1);  
        return Math.min(verticalDistance, horizontalDistance)
    }

    // private getMainContinentHexes(): Hex[] {
    //     // start in middle, find first hex that is land, recursively traverse every connecting hex until each hex is in array or all remaining hexes are water
    //     // find middle land hex
    //     var middleLandHex =  
    // }

    // private getLandHexClosestToMiddle(): Hex {
    //     var x = this.state.grid.width / 2;
    //     var y = this.state.grid.height / 2;
    //     var hex = this.state.grid.Hexes[x][y];
    //     while (hex.type === HexType.Water) {
    //         hex = 
    //     }
    // }

    // private findHexSearchingInCircularPattern(startX: number, startY: number, )

    private getHexType(x: number, y: number) {
        const spacesToOutside = this.getSpacesFromOutside(x, y);
        let chanceLand;
        switch (spacesToOutside) {
            case 0:
                chanceLand = 0;
                break;
            case 1:
                chanceLand = .7;
                break;
            case 2:
                chanceLand = .8;
                break;
            case 3:
                chanceLand = .85;
                break;
            case 4:
                chanceLand = .9;
                break;
            case 5:
                chanceLand = .95;
                break;
            default:
                chanceLand = .999;
        }
        return Math.random() < chanceLand ? HexType.Land : HexType.Water;
    }

    private drawHexGrid() {
        // https://mobsor.com/blog/2020/06/creating-an-interactive-hexagon-grid-in-phaser/
        var landHexColor = 0x49D163;
        var waterHexColor = 0x7CADD7;
        var selectedHexColor = 0x3000ff;
        var lineColor = 0xef15ff;
        var lineWidth = 1;
        const longestDiagonal = this.getLongestDiagonal(this.hexSize);
        let hexCoords: number[] = this.getHexCoords(this.hexSize);
        for (let x: number = 0; x <= this.state.grid.width - 1; x++) {
            for (let y: number = 0; y <= this.state.grid.height - 1; y++) {
                var hexData = this.state.grid.Hexes[x][y];
                // TODO: some of the edges aren't ligning up, I think due to floating point accuracy of the engine.
                let hexX = x * longestDiagonal              // move right to colum x
                    - x * longestDiagonal / 4               // move back to align top left-side with previous hex's bottom-right side
                    + (x * (lineWidth - 1));                    // move right for every line width between row
                // let hexX = x * hexSize - (x * (hexSize / 9));

                let hexY = y * this.hexSize                      // move down to row y
                    + (x % 2 === 1 ? this.hexSize / 2 : 0)     // move down half row every other column
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
