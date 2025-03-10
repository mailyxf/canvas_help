import { state, redrawDrawing } from './canvasSetup.js';

export function setupToggleDrag() {
  state.toggleDragBtn.addEventListener('click', () => {
    state.dragMode = !state.dragMode;
    state.brushMode = false;
    state.eraserMode = false;
    state.bezierMode = false;
    if (state.dragMode) {
      state.toggleDragBtn.classList.add('active');
      state.drawCanvas.style.cursor = 'move';
    } else {
      state.toggleDragBtn.classList.remove('active');
      state.drawCanvas.style.cursor = 'default';
    }
    redrawDrawing();
  });
}
