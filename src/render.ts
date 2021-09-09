import { CTX } from "./main.js";
/*
    goals
    - rener hex grid
    - apply state to hex grid
*/

export function render() {
    drawHexGrid(500, 500);
}


const angle60 = 2 * Math.PI / 6;
const radius = 40;


function drawHexGrid(width: number, height: number) {
    for (let y = radius; y + radius * Math.sin(angle60) < height; y += radius * Math.sin(angle60)) {
        for (let x = radius, j = 0; x + radius * (1 + Math.cos(angle60)) < width; x += radius * (1 + Math.cos(angle60)), y += (-1) ** j++ * radius * Math.sin(angle60)) {
            drawHexagon(x, y);
        }
    }
}

function drawHexagon(xPos: number, yPos: number) {
    CTX.beginPath();
    for (var i = 0; i < 6; i++) {
        CTX.lineTo(xPos + radius * Math.cos(angle60 * i), yPos + radius * Math.sin(angle60 * i));
    }
    CTX.closePath();
    CTX.stroke();
}

function drawLine() {
    CTX.beginPath();       // Start a new path
    CTX.moveTo(30, 50);    // Move the pen to (30, 50)
    CTX.lineTo(150, 100);  // Draw a line to (150, 100)
    CTX.stroke();          // Render the path
}
