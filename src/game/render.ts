import { Scene } from "phaser";
import { HexType } from "../models/hex";
import { ItemType } from "../models/item";
import { State } from "../models/state";

export function renderGrid(state: State) {
    // https://mobsor.com/blog/2020/06/creating-an-interactive-hexagon-grid-in-phaser/
    var landHexColor = 0x49D163;
    var waterHexColor = 0x7CADD7;
    var selectedHexColor = 0x3000ff;
    var defaultLineColor = 0xefc53f;
    var highlightLineColor = 0xef15ff;
    var lineWidth = 1;
    for (let y: number = 0; y <= state.grid.height - 1; y++) {
        for (let x: number = 0; x <= state.grid.width - 1; x++) {
            var hexData = state.grid.hexes[y][x];
            // TODO: some of the edges aren't ligning up, I think due to floating point accuracy of the engine.
            let hexX = x * state.grid.longestDiagonal              // move right to colum x
                - x * state.grid.longestDiagonal / 4               // move back to align top left-side with previous hex's bottom-right side
                + (x * (lineWidth - 1));                    // move right for every line width between row
            // let hexX = x * state.grid.hexSize - (x * (state.grid.hexSize / 9));

            let hexY = y * state.grid.hexSize                      // move down to row y
                + (x % 2 === 1 ? state.grid.hexSize / 2 : 0)     // move down half row every other column
                + (y * (lineWidth));                    // move down for every line width between row

            let hexColor = hexData.type === HexType.Land ? landHexColor : waterHexColor;
            let hexGameObject = state.scene.add.polygon(hexX, hexY, state.grid.hexCoords, hexColor).setOrigin(0, 0);
            hexGameObject.setStrokeStyle(lineWidth, defaultLineColor);
            hexGameObject.setData('painted', false);
            hexGameObject.setData('color', hexColor);
            hexGameObject.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
                console.log('click x:' + x + ' y:' + y);
                hexGameObject.data.values.painted = !hexGameObject.data.values.painted;
                hexGameObject.setStrokeStyle(20, highlightLineColor);
                hexGameObject.setFillStyle(hexGameObject.data.values.painted ? selectedHexColor : hexColor);
            }).on('pointerup', () => {
                hexGameObject.setStrokeStyle(lineWidth, defaultLineColor);
            });
            hexData.gameObject = hexGameObject;
        }
    }
}


export function renderGameObjects(state: State) {
    for (let y: number = 0; y <= state.grid.height - 1; y++) {
        for (let x: number = 0; x <= state.grid.width - 1; x++) {
            const hex = state.grid.hexes[y][x];
            // render
            if (hex.item != null) {
                const center = hex.gameObject.getCenter();
                const it = ItemType;
                const sprite = state.scene.add.sprite(center.x, center.y, ItemType[hex.item]);
                sprite.setDisplaySize(20, 20);
                const mask = hex.gameObject.createBitmapMask(sprite);
                hex.gameObject.setMask(mask);
                hex.gameObject.clearMask();       
            }
        }
    }
}

