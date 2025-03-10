import { state, redrawDrawing } from './canvasSetup.js';

export function setupToggleBrush() {
  state.toggleBrushBtn.addEventListener('click', () => {
    state.brushMode = !state.brushMode;
    state.eraserMode = false;
    state.bezierMode = false;
    state.dragMode = false;
    state.drawCanvas.style.cursor = 'default';
    state.toggleDragBtn.classList.remove('active');
    if (state.brushMode) {
      state.toggleBrushBtn.classList.add('active');
      state.toggleEraserBtn.classList.remove('active');
      state.drawBezierBtn.classList.remove('active');
    } else {
      state.toggleBrushBtn.classList.remove('active');
    }
    redrawDrawing();
  });
}
