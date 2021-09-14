import { Scene } from "phaser";
import { HexType } from "../models/hex";
import { State } from "../models/state";

export function renderGrid(state: State, scene: Scene) {
    // https://mobsor.com/blog/2020/06/creating-an-interactive-hexagon-grid-in-phaser/
    var landHexColor = 0x49D163;
    var waterHexColor = 0x7CADD7;
    var selectedHexColor = 0x3000ff;
    var lineColor = 0xef15ff;
    var lineWidth = 1;
    const longestDiagonal = getLongestDiagonal(state.grid.hexSize);
    let hexCoords: number[] = getHexCoords(state.grid.hexSize);
    for (let x: number = 0; x <= state.grid.width - 1; x++) {
        for (let y: number = 0; y <= state.grid.height - 1; y++) {
            var hexData = state.grid.hexes[x][y];
            // TODO: some of the edges aren't ligning up, I think due to floating point accuracy of the engine.
            let hexX = x * longestDiagonal              // move right to colum x
                - x * longestDiagonal / 4               // move back to align top left-side with previous hex's bottom-right side
                + (x * (lineWidth - 1));                    // move right for every line width between row
            // let hexX = x * state.grid.hexSize - (x * (state.grid.hexSize / 9));

            let hexY = y * state.grid.hexSize                      // move down to row y
                + (x % 2 === 1 ? state.grid.hexSize / 2 : 0)     // move down half row every other column
                + (y * (lineWidth));                    // move down for every line width between row

            let hexColor = hexData.type === HexType.Land ? landHexColor : waterHexColor;
            let hex1 = scene.add.polygon(hexX, hexY, hexCoords, hexColor).setOrigin(0, 0);
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
    setCamera(state, scene);
}

function getHexCoords(hexSize: number): number[] {
    //http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
    let longestDiagonal = getLongestDiagonal(hexSize);
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

function getLongestDiagonal(hexSize: number): number {
    return (4 * (hexSize / 2 / Math.sqrt(3)));
}

function setCamera(state: State, scene: Scene) {
    // set camera based on grid size and hexsize
    const cameraWidth = (state.grid.width ) * (state.grid.hexSize );             // this math doesn't make sense
    const cameraHeight = (state.grid.height + 4) * (state.grid.hexSize + 1);     // this math makes sense for setting camera y bounds to 2 hex's on each side 
    scene.cameras.main.setBounds(-2 * state.grid.hexSize, -2 * state.grid.hexSize, cameraWidth, cameraHeight);
    scene.cameras.main.setZoom(2);
    scene.cameras.main.centerToBounds();
}