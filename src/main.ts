import { render } from "./render";

export let CANVAS: HTMLCanvasElement;
export let CTX: CanvasRenderingContext2D;

function startGame() {
    initCanvas();
    setCanvasDimensions();
    render();
}

function initCanvas(): void {
    CANVAS = document.getElementById("canvas") as HTMLCanvasElement;
    CTX = CANVAS.getContext("2d") ?? new CanvasRenderingContext2D();
    CTX.imageSmoothingEnabled = false;
}

function setCanvasDimensions(): void {
    CANVAS.style.width = `${window.innerWidth}px`;
    CANVAS.style.height = `${window.innerHeight}px`;
    CANVAS.width = Math.floor(window.innerWidth * window.devicePixelRatio);
    CANVAS.height = Math.floor(window.innerHeight * window.devicePixelRatio);
}

startGame();