export let CANVAS: HTMLCanvasElement;
export let CTX: CanvasRenderingContext2D;

function startGame() {
    // test
    var t = 5;
    initCanvas();
    setCanvasDimensions();
    CTX.beginPath();       // Start a new path
    CTX.moveTo(30, 50);    // Move the pen to (30, 50)
    CTX.lineTo(150, 100);  // Draw a line to (150, 100)
    CTX.stroke();          // Render the path
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