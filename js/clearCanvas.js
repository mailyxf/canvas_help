import { state, updateCodeEditor, redrawDrawing } from './canvasSetup.js';

export function setupClearCanvas() {
  state.clearCanvasBtn.addEventListener('click', () => {
    state.brushStrokes = [];
    state.eraserStrokes = [];
    state.bezierPoints = [];
    state.bezierCurves = [];
    state.brushCodes = [];
    state.bezierCodes = [];
    state.codeGeneratedShapes = [];
    updateCodeEditor();
    redrawDrawing();
  });
}
