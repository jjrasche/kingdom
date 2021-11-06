import { getHexColor, getLighterHexColor, getLighterPlayerColor, HexTypeColor, setHexColor } from "../models/colors";
import { DefaultAlpha, DefaultLineColor, HighlightedAlpha, lineWidth } from "../models/grid";
import { ItemType } from "../models/item";
import { State } from "../models/state";
import { setMapInteraction } from "./map";

export function renderGrid(state: State) {
    // https://mobsor.com/blog/2020/06/creating-an-interactive-hexagon-grid-in-phaser/
    for (let y: number = 0; y <= state.grid.height - 1; y++) {
        for (let x: number = 0; x <= state.grid.width - 1; x++) {
            var hex = state.grid.hexes[y][x];
            // TODO: some of the edges aren't ligning up, I think due to floating point accuracy of the engine.
            let hexX = x * state.grid.longestDiagonal              // move right to colum x
                - x * state.grid.longestDiagonal / 4               // move back to align top left-side with previous hex's bottom-right side
                + (x * (lineWidth - 1));                    // move right for every line width between row
            // let hexX = x * state.grid.hexSize - (x * (state.grid.hexSize / 9));

            let hexY = y * state.grid.hexSize                      // move down to row y
                + (x % 2 === 1 ? state.grid.hexSize / 2 : 0)     // move down half row every other column
                + (y * (lineWidth));                               // move down for every line width between row

            let hexColor = HexTypeColor[hex.type];
            let hexGameObject = state.scene.add.polygon(hexX, hexY, state.grid.hexCoords, hexColor.color, DefaultAlpha).setOrigin(0, 0);
            // Phaser.GameObjects.Polygon.GetPoints(hexGameObject);
            // Phaser.GameObjects.Polygon vs. Phaser.Geom.Polygon
            // var t = new Phaser.GameObjects.Line(state.scene, );

            hexGameObject.setStrokeStyle(lineWidth, DefaultLineColor);
            hex.gameObject = hexGameObject;
            setMapInteraction(hex, state);
        }
    }
}


export function renderGameObjects(state: State) {
    // items on grid
    for (let y: number = 0; y <= state.grid.height - 1; y++) {
        for (let x: number = 0; x <= state.grid.width - 1; x++) {
            const hex = state.grid.hexes[y][x];
            if (hex.sprite != null) {
                hex.sprite.destroy();
            }
            if (hex.item != null) {
                const center = hex.gameObject.getCenter();
                const it = ItemType;
                const sprite = state.scene.add.sprite(center.x, center.y, ItemType[hex.item.type]);
                sprite.setDisplaySize(20, 20);
                hex.sprite = sprite;
                // const mask = hex.gameObject.createBitmapMask(sprite);
                // hex.gameObject.setMask(mask);
                // hex.gameObject.clearMask();       
            }
            setHexColor(hex, getHexColor(hex, state));
        }
    }    
    // highlighted lines
    (state.highlightedHexes ?? []).forEach(hex => {
        setHexColor(hex, getLighterHexColor(hex, state, 50));
    });

}

