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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO0tBQzVGO0lBQ0QsZ0RBQWEsRUFBRSxDQUFDO0lBQ2hCLDZDQUFVLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxRQUFRO0lBQ2IsZ0RBQWEsRUFBRSxDQUFDLENBQU8sbUJBQW1CO0lBQzFDLDZDQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksMkJBQTJCO0lBQ2xELDZDQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUUsNEJBQTRCO0lBQ25ELDZDQUFVLEVBQUUsQ0FBQyxDQUFVLGtCQUFrQjtBQUM3QyxDQUFDOzs7Ozs7O1VDMUNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2luZ2RvbS8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL2tpbmdkb20vLi9zcmMvcmVuZGVyLnRzIiwid2VicGFjazovL2tpbmdkb20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2luZ2RvbS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2luZ2RvbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tpbmdkb20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9raW5nZG9tL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8va2luZ2RvbS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8va2luZ2RvbS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XHJcblxyXG5leHBvcnQgbGV0IENBTlZBUzogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgQ1RYOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XHJcbiAgICBpbml0Q2FudmFzKCk7XHJcbiAgICBzZXRDYW52YXNEaW1lbnNpb25zKCk7XHJcbiAgICByZW5kZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdENhbnZhcygpOiB2b2lkIHtcclxuICAgIENBTlZBUyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgQ1RYID0gQ0FOVkFTLmdldENvbnRleHQoXCIyZFwiKSA/PyBuZXcgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKCk7XHJcbiAgICBDVFguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENhbnZhc0RpbWVuc2lvbnMoKTogdm9pZCB7XHJcbiAgICBDQU5WQVMuc3R5bGUud2lkdGggPSBgJHt3aW5kb3cuaW5uZXJXaWR0aH1weGA7XHJcbiAgICBDQU5WQVMuc3R5bGUuaGVpZ2h0ID0gYCR7d2luZG93LmlubmVySGVpZ2h0fXB4YDtcclxuICAgIENBTlZBUy53aWR0aCA9IE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGggKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICBDQU5WQVMuaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJIZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbn1cclxuXHJcbnN0YXJ0R2FtZSgpOyIsImltcG9ydCB7IENUWCB9IGZyb20gXCIuL21haW5cIjtcclxuLypcclxuICAgIGdvYWxzXHJcbiAgICAtIHJlbmVyIGhleCBncmlkXHJcbiAgICAtIGFwcGx5IHN0YXRlIHRvIGhleCBncmlkXHJcblxyXG4gICAgZnJvbTogXHJcbiAgICAgICAgLSBodHRwczovL3d3dy5lbWFudWVsZWZlcm9uYXRvLmNvbS90YWcvaGV4YWdvbmFsLXRpbGVzL1xyXG4qL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGhleFBvc2l0aW9ucyA9IFxyXG4gICAgZHJhd0hleEdyaWQoNTAwLCA1MDApO1xyXG59XHJcblxyXG5cclxuY29uc3QgYW5nbGU2MCA9IDIgKiBNYXRoLlBJIC8gNjtcclxuY29uc3QgcmFkaXVzID0gNDA7XHJcblxyXG5cclxuZnVuY3Rpb24gZHJhd0hleEdyaWQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IHkgPSByYWRpdXM7IHkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZTYwKSA8IGhlaWdodDsgeSArPSByYWRpdXMgKiBNYXRoLnNpbihhbmdsZTYwKSkge1xyXG4gICAgICAgIGZvciAobGV0IHggPSByYWRpdXMsIGogPSAwOyB4ICsgcmFkaXVzICogKDEgKyBNYXRoLmNvcyhhbmdsZTYwKSkgPCB3aWR0aDsgeCArPSByYWRpdXMgKiAoMSArIE1hdGguY29zKGFuZ2xlNjApKSwgeSArPSAoLTEpICoqIGorKyAqIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlNjApKSB7XHJcbiAgICAgICAgICAgIGRyYXdIZXhhZ29uKHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0hleGFnb24oeFBvczogbnVtYmVyLCB5UG9zOiBudW1iZXIpIHtcclxuICAgIENUWC5iZWdpblBhdGgoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgQ1RYLmxpbmVUbyh4UG9zICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGU2MCAqIGkpLCB5UG9zICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGU2MCAqIGkpKTtcclxuICAgIH1cclxuICAgIENUWC5jbG9zZVBhdGgoKTtcclxuICAgIENUWC5zdHJva2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0xpbmUoKSB7XHJcbiAgICBDVFguYmVnaW5QYXRoKCk7ICAgICAgIC8vIFN0YXJ0IGEgbmV3IHBhdGhcclxuICAgIENUWC5tb3ZlVG8oMzAsIDUwKTsgICAgLy8gTW92ZSB0aGUgcGVuIHRvICgzMCwgNTApXHJcbiAgICBDVFgubGluZVRvKDE1MCwgMTAwKTsgIC8vIERyYXcgYSBsaW5lIHRvICgxNTAsIDEwMClcclxuICAgIENUWC5zdHJva2UoKTsgICAgICAgICAgLy8gUmVuZGVyIHRoZSBwYXRoXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9