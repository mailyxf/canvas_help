import { state, redrawDrawing } from './canvasSetup.js';

export function setupToggleEraser() {
  state.toggleEraserBtn.addEventListener('click', () => {
    state.eraserMode = !state.eraserMode;
    state.brushMode = false;
    state.bezierMode = false;
    state.dragMode = false;
    state.toggleDragBtn.classList.remove('active');
    if (state.eraserMode) {
      state.toggleEraserBtn.classList.add('active');
      state.toggleBrushBtn.classList.remove('active');
      state.drawBezierBtn.classList.remove('active');
      state.drawCanvas.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${state.eraserSize}" height="${state.eraserSize}" style="fill:chartreuse"><rect x="0" y="0" width="${state.eraserSize}" height="${state.eraserSize}"/></svg>') 0 0, auto`;
    } else {
      state.toggleEraserBtn.classList.remove('active');
      state.drawCanvas.style.cursor = 'default';
    }
    redrawDrawing();
  });
}
