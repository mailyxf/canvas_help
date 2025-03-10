import { resizeCanvases } from './canvasSetup.js';

export function setupResizeCanvas() {
  window.addEventListener('resize', resizeCanvases);
}
