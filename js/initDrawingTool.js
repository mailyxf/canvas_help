import { initState, setupCanvas } from './canvasSetup.js';
import { setupResizeCanvas } from './resizeCanvas.js';
import { setupClearCanvas } from './clearCanvas.js';
import { setupToggleBrush } from './toggleBrush.js';
import { setupToggleEraser } from './toggleEraser.js';
import { setupDrawBezier } from './drawBezier.js';
import { setupToggleDrag } from './toggleDrag.js';
import { setupRunCode } from './runCode.js';

export function initDrawingTool() {
  // 初始化前请确保页面布局已经构建完毕
  initState();
  setupCanvas();
  setupResizeCanvas();
  setupClearCanvas();
  setupToggleBrush();
  setupToggleEraser();
  setupDrawBezier();
  setupToggleDrag();
  setupRunCode();
}
