import { render } from "./render.js";
export let CANVAS;
export let CTX;
function startGame() {
    initCanvas();
    setCanvasDimensions();
    render();
}
function initCanvas() {
    CANVAS = document.getElementById("canvas");
    CTX = CANVAS.getContext("2d") ?? new CanvasRenderingContext2D();
    CTX.imageSmoothingEnabled = false;
}
function setCanvasDimensions() {
    CANVAS.style.width = `${window.innerWidth}px`;
    CANVAS.style.height = `${window.innerHeight}px`;
    CANVAS.width = Math.floor(window.innerWidth * window.devicePixelRatio);
    CANVAS.height = Math.floor(window.innerHeight * window.devicePixelRatio);
}
startGame();
//# sourceMappingURL=main.js.map