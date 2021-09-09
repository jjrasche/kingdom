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

class PlayGame extends Scene {
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl
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
        this.drawHexGrid(8, 8, 50);

        const cursors = this.input.keyboard.createCursorKeys()
		this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
			zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
			acceleration: 0.06,
			drag: 0.0005,
			maxSpeed: 1.0
		})

    }
	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)
	}

    private drawHexGrid(width: number, height: number, hexSize: number) {
        var defaultHexColor = 0xffffff;
        var selectedHexColor = 0x3000ff;
        var lineColor = 0xef15ff;
        var lineWidth = 1;
        const longestDiagonal = this.getLongestDiagonal(hexSize);
        let hexCoords: number[] = this.getHexCoords(hexSize);
        for (let x: number = 0; x <= width - 1; x++) {
            for (let y: number = 0; y <= height - 1; y++) {
                // TODO: some of the edges aren't ligning up, I think due to floating point accuracy of the engine.
                let hexX = x * longestDiagonal              // move right to colum x
                    - x * longestDiagonal / 4               // move back to align top left-side with previous hex's bottom-right side
                    + (x * (lineWidth - 1));                    // move right for every line width between row
                // let hexX = x * hexSize - (x * (hexSize / 9));

                let hexY = y * hexSize                      // move down to row y
                    + (x %   2 === 1 ? hexSize / 2 : 0)     // move down half row every other column
                    + (y * (lineWidth));                    // move down for every line width between row

                let hex1 = this.add.polygon(hexX, hexY, hexCoords, defaultHexColor).setOrigin(0, 0);
                hex1.setStrokeStyle(lineWidth, 0xefc53f);
                hex1.setData('painted', false);
                hex1.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
                    console.log('click x:' + x + ' y:' + y);
                    hex1.data.values.painted = !hex1.data.values.painted;
                    hex1.setStrokeStyle(20, lineColor);
                    hex1.setFillStyle(hex1.data.values.painte ? selectedHexColor : defaultHexColor);
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







// class HexGridScene extends Phaser.Scene {
//     private gridContainer: Phaser.GameObjects.Container;
//     constructor() {
//         console.log('construct hex grid scene')
//         super({
//             key: 'HexGridScene'
//         });
//     }
//     preload() {
//         //nothing to preload
//     }
//     create() {
//         this.gridContainer = this.add.container(75, 75)
//         let menuItem: Phaser.GameObjects.Text = this.add.text(15, 10, "Home",
//             { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: "25", color: '#3333ff' });
//         menuItem.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
//             window.history.replaceState({}, 'Phaser 3 Examples', './');
//             this.scene.start('MenuScene');
//         });
//         menuItem.setScrollFactor(0)
//         //Draw a 5 by 8 grid of 75 width hexagons at 5,5 - They will be placed in the gridContainer so will be at 80,80
//         this.drawHexGrid(8, 8, 75, 5, 5);
//     }
//     drawHexGrid(width: number, height: number, hexHeight: number, startX: number = 0, startY: number = 0) {
//         let hexCoords: number[] = this.getHexCoords(hexHeight);
//         for (let x: number = 0; x <= width - 1; x++) {
//             for (let y: number = 0; y <= height - 1; y++) {
//                 let hexX = x * hexHeight - (x * (hexHeight / 9));
//                 let hexY = y * hexHeight + (y * 2);
//                 if (x % 2 === 1) {
//                     hexY += hexHeight / 2;
//                 }
//                 let hex1 = this.add.polygon(hexX + startX, hexY + startY, hexCoords, 0xffffff);
//                 hex1.setStrokeStyle(1, 0xefc53f);
//                 hex1.setData('painted', false);
//                 hex1.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
//                     console.log('click x:' + x + ' y:' + y);
//                     hex1.setStrokeStyle(2, 0xef15ff);
//                     hex1.data.values.painted = !hex1.data.values.painted;
//                     if (hex1.data.values.painted) {
//                         hex1.setFillStyle(0x3000ff)
//                     } else {
//                         hex1.setFillStyle(0xffffff)
//                     }
//                 }).on('pointerup', () => {
//                     console.log('mouse up');
//                     hex1.setStrokeStyle(1, 0xefc53f);
//                 });
//                 this.gridContainer.add(hex1);
//             }
//         }
//     }
//     getHexCoords(height: number): number[] {
//         //http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
//         let width: number = (4 * (height / 2 / Math.sqrt(3)));
//         let y: number = height / 2;
//         let hexCoords: number[] = [
//             0, y, width * 0.25, y - height / 2, width * 0.75,
//             y - height / 2, width, y, width * 0.75, y + height / 2,
//             width * 0.25, y + height / 2];
//         return hexCoords;
//     }
// }
// export default HexGridScene;
