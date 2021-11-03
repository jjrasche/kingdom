import { Hex, HexType } from "./hex";
import { Player } from "./player";
import { State } from "./state";

export const White = Phaser.Display.Color.RGBStringToColor("rgb(255, 255, 255)");
export const Silver = Phaser.Display.Color.RGBStringToColor("rgb(192, 192, 192)");
export const Gray = Phaser.Display.Color.RGBStringToColor("rgb(128, 128, 128)");
export const Black = Phaser.Display.Color.RGBStringToColor("rgb(0, 0, 0)");
export const Red = Phaser.Display.Color.RGBStringToColor("rgb(255, 0, 0)");
export const Maroon = Phaser.Display.Color.RGBStringToColor("rgb(128, 0, 0)");
export const Yellow = Phaser.Display.Color.RGBStringToColor("rgb(255, 255, 0)");
export const Olive = Phaser.Display.Color.RGBStringToColor("rgb(128, 128, 0)");
export const Lime = Phaser.Display.Color.RGBStringToColor("rgb(0, 255, 0)");
export const Green = Phaser.Display.Color.RGBStringToColor("rgb(0, 128, 0)");
export const Aqua = Phaser.Display.Color.RGBStringToColor("rgb(0, 255, 255)");
export const Teal = Phaser.Display.Color.RGBStringToColor("rgb(0, 128, 128)");
export const Blue = Phaser.Display.Color.RGBStringToColor("rgb(0, 0, 255)");
export const Navy = Phaser.Display.Color.RGBStringToColor("rgb(0, 0, 128)");
export const Fuchsia = Phaser.Display.Color.RGBStringToColor("rgb(255, 0, 255)");
export const Purple = Phaser.Display.Color.RGBStringToColor("rgb(128, 0, 128)");

export const LandColor = Phaser.Display.Color.IntegerToColor(0x49D163);
export const WaterColor = Phaser.Display.Color.IntegerToColor(0x7CADD7);
export const HexTypeColor: {[key in HexType]: Phaser.Display.Color } = {
    [HexType.Land]: LandColor,
    [HexType.Water]: WaterColor
};

export const PlayerColors = [Maroon, Olive, Teal, Navy, Purple];

export function setHexColor(hex: Hex, color: Phaser.Display.Color) {
    const prevHexFill = hex.gameObject.fillColor;
    const colorNumber = color instanceof Phaser.Display.Color ? color.color : color;
    hex.gameObject.setFillStyle(colorNumber);
    // console.log("rgba: " + (color as Phaser.Display.Color).rgba + "\tcolor: " + colorNumber + "\tprev: " + prevHexFill + "\tcurr: " + hex.gameObject.fillColor);
}

export function getLighterHexColor(hex: Hex, state: State, percent: number): Phaser.Display.Color {
    const color = hex.ownedBy == null ? HexTypeColor[hex.type] : state.players[hex.ownedBy].phaserColor;
    return getLighterColor(color, percent);
}

export function getLighterPlayerColor(player: Player, percent: number): Phaser.Display.Color {
    return getLighterColor(player.phaserColor, percent);
}

export function getLighterColor(color: Phaser.Display.Color, percent: number): Phaser.Display.Color {
    const copy = Phaser.Display.Color.RGBStringToColor(color.rgba);
    // console.log("before: " + (color as Phaser.Display.Color).rgba);
    return copy.brighten(percent);
}
