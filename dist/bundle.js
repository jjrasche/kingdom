/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CANVAS": () => (/* binding */ CANVAS),
/* harmony export */   "CTX": () => (/* binding */ CTX)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.ts");

let CANVAS;
let CTX;
function startGame() {
    initCanvas();
    setCanvasDimensions();
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)();
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


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.ts");

/*
    goals
    - rener hex grid
    - apply state to hex grid

    from:
        - https://www.emanueleferonato.com/tag/hexagonal-tiles/
*/
function render() {
    const hexPositions = drawHexGrid(500, 500);
}
const angle60 = 2 * Math.PI / 6;
const radius = 40;
function drawHexGrid(width, height) {
    for (let y = radius; y + radius * Math.sin(angle60) < height; y += radius * Math.sin(angle60)) {
        for (let x = radius, j = 0; x + radius * (1 + Math.cos(angle60)) < width; x += radius * (1 + Math.cos(angle60)), y += (-1) ** j++ * radius * Math.sin(angle60)) {
            drawHexagon(x, y);
        }
    }
}
function drawHexagon(xPos, yPos) {
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.beginPath();
    for (var i = 0; i < 6; i++) {
        _main__WEBPACK_IMPORTED_MODULE_0__.CTX.lineTo(xPos + radius * Math.cos(angle60 * i), yPos + radius * Math.sin(angle60 * i));
    }
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.closePath();
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.stroke();
}
function drawLine() {
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.beginPath(); // Start a new path
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.moveTo(30, 50); // Move the pen to (30, 50)
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.lineTo(150, 100); // Draw a line to (150, 100)
    _main__WEBPACK_IMPORTED_MODULE_0__.CTX.stroke(); // Render the path
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUM7S0FDNUY7SUFDRCxnREFBYSxFQUFFLENBQUM7SUFDaEIsNkNBQVUsRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLFFBQVE7SUFDYixnREFBYSxFQUFFLENBQUMsQ0FBTyxtQkFBbUI7SUFDMUMsNkNBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSwyQkFBMkI7SUFDbEQsNkNBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBRSw0QkFBNEI7SUFDbkQsNkNBQVUsRUFBRSxDQUFDLENBQVUsa0JBQWtCO0FBQzdDLENBQUM7Ozs7Ozs7VUMxQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9raW5nZG9tLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8va2luZ2RvbS8uL3NyYy9yZW5kZXIudHMiLCJ3ZWJwYWNrOi8va2luZ2RvbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9raW5nZG9tL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9raW5nZG9tL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2luZ2RvbS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tpbmdkb20vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9raW5nZG9tL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9raW5nZG9tL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcclxuXHJcbmV4cG9ydCBsZXQgQ0FOVkFTOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuZXhwb3J0IGxldCBDVFg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcclxuICAgIGluaXRDYW52YXMoKTtcclxuICAgIHNldENhbnZhc0RpbWVuc2lvbnMoKTtcclxuICAgIHJlbmRlcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FudmFzKCk6IHZvaWQge1xyXG4gICAgQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBDVFggPSBDQU5WQVMuZ2V0Q29udGV4dChcIjJkXCIpID8/IG5ldyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQoKTtcclxuICAgIENUWC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q2FudmFzRGltZW5zaW9ucygpOiB2b2lkIHtcclxuICAgIENBTlZBUy5zdHlsZS53aWR0aCA9IGAke3dpbmRvdy5pbm5lcldpZHRofXB4YDtcclxuICAgIENBTlZBUy5zdHlsZS5oZWlnaHQgPSBgJHt3aW5kb3cuaW5uZXJIZWlnaHR9cHhgO1xyXG4gICAgQ0FOVkFTLndpZHRoID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgIENBTlZBUy5oZWlnaHQgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lckhlaWdodCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxufVxyXG5cclxuc3RhcnRHYW1lKCk7IiwiaW1wb3J0IHsgQ1RYIH0gZnJvbSBcIi4vbWFpblwiO1xyXG4vKlxyXG4gICAgZ29hbHNcclxuICAgIC0gcmVuZXIgaGV4IGdyaWRcclxuICAgIC0gYXBwbHkgc3RhdGUgdG8gaGV4IGdyaWRcclxuXHJcbiAgICBmcm9tOiBcclxuICAgICAgICAtIGh0dHBzOi8vd3d3LmVtYW51ZWxlZmVyb25hdG8uY29tL3RhZy9oZXhhZ29uYWwtdGlsZXMvXHJcbiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgY29uc3QgaGV4UG9zaXRpb25zID0gXHJcbiAgICBkcmF3SGV4R3JpZCg1MDAsIDUwMCk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBhbmdsZTYwID0gMiAqIE1hdGguUEkgLyA2O1xyXG5jb25zdCByYWRpdXMgPSA0MDtcclxuXHJcblxyXG5mdW5jdGlvbiBkcmF3SGV4R3JpZCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgZm9yIChsZXQgeSA9IHJhZGl1czsgeSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlNjApIDwgaGVpZ2h0OyB5ICs9IHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlNjApKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IHJhZGl1cywgaiA9IDA7IHggKyByYWRpdXMgKiAoMSArIE1hdGguY29zKGFuZ2xlNjApKSA8IHdpZHRoOyB4ICs9IHJhZGl1cyAqICgxICsgTWF0aC5jb3MoYW5nbGU2MCkpLCB5ICs9ICgtMSkgKiogaisrICogcmFkaXVzICogTWF0aC5zaW4oYW5nbGU2MCkpIHtcclxuICAgICAgICAgICAgZHJhd0hleGFnb24oeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3SGV4YWdvbih4UG9zOiBudW1iZXIsIHlQb3M6IG51bWJlcikge1xyXG4gICAgQ1RYLmJlZ2luUGF0aCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICBDVFgubGluZVRvKHhQb3MgKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZTYwICogaSksIHlQb3MgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZTYwICogaSkpO1xyXG4gICAgfVxyXG4gICAgQ1RYLmNsb3NlUGF0aCgpO1xyXG4gICAgQ1RYLnN0cm9rZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3TGluZSgpIHtcclxuICAgIENUWC5iZWdpblBhdGgoKTsgICAgICAgLy8gU3RhcnQgYSBuZXcgcGF0aFxyXG4gICAgQ1RYLm1vdmVUbygzMCwgNTApOyAgICAvLyBNb3ZlIHRoZSBwZW4gdG8gKDMwLCA1MClcclxuICAgIENUWC5saW5lVG8oMTUwLCAxMDApOyAgLy8gRHJhdyBhIGxpbmUgdG8gKDE1MCwgMTAwKVxyXG4gICAgQ1RYLnN0cm9rZSgpOyAgICAgICAgICAvLyBSZW5kZXIgdGhlIHBhdGhcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=