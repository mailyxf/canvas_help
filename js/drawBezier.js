import { state, redrawDrawing, updateCodeEditor, generateBezierCode } from './canvasSetup.js';

export function setupDrawBezier() {
  state.drawBezierBtn.addEventListener('click', () => {
    state.bezierMode = !state.bezierMode;
    state.brushMode = false;
    state.eraserMode = false;
    state.dragMode = false;
    state.toggleDragBtn.classList.remove('active');
    state.drawCanvas.style.cursor = 'default';
    if (state.bezierMode) {
      state.drawBezierBtn.classList.add('active');
      state.toggleBrushBtn.classList.remove('active');
      state.toggleEraserBtn.classList.remove('active');
      redrawDrawing();
      updateCodeEditor();
    } else {
      state.drawBezierBtn.classList.remove('active');
    }
  });
}
