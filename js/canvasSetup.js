export const state = {};


export function initState() {
  state.widthInput = document.getElementById('width');
  state.heightInput = document.getElementById('height');
  state.resizeBtn = document.getElementById('resizeBtn');
  state.clearCanvasBtn = document.getElementById('clearCanvas');
  state.toggleBrushBtn = document.getElementById('toggleBrush');
  state.toggleEraserBtn = document.getElementById('toggleEraser');
  state.drawBezierBtn = document.getElementById('drawBezier');
  state.toggleDragBtn = document.getElementById('toggleDrag');
  state.colorPicker = document.getElementById('colorPicker');
  state.eraserSizeInput = document.getElementById('eraserSize');
  state.runCodeBtn = document.getElementById('runCode');
  state.codeEditor = document.getElementById('codeEditor');
  state.coordinateDisplay = document.getElementById('coordinateDisplay');
  state.tooltip = document.getElementById('tooltip');

  state.canvasContainer = document.getElementById('canvasContainer');
  state.gridCanvas = document.getElementById('gridCanvas');
  state.drawCanvas = document.getElementById('drawCanvas');


  state.gridCtx = state.gridCanvas.getContext('2d');
  state.drawCtx = state.drawCanvas.getContext('2d');


  state.brushMode = false;
  state.eraserMode = false;
  state.bezierMode = false;
  state.dragMode = false;
  state.draggingControl = null;
  state.isDrawing = false;
  state.currentStroke = [];
  state.brushStrokes = [];
  state.eraserStrokes = [];
  state.isErasing = false;
  state.codeGeneratedShapes = [];
  state.eraserSize = parseInt(state.eraserSizeInput.value);
  state.bezierPoints = [];
  state.bezierCurves = [];
  state.draggingPoint = null;
  state.brushCodes = [];
  state.bezierCodes = [];
}


export function updateCodeEditor() {
  let codeStr = "";
  if (state.brushCodes.length > 0) {
    codeStr += state.brushCodes.join("\n") + "\n";
  }
  if (state.bezierCodes.length > 0) {
    codeStr += state.bezierCodes.join("\n") + "\n";
  }
  if (state.bezierMode && state.bezierPoints.length > 0 && state.bezierPoints.length < 4) {
    codeStr += "// 当前编辑的贝塞尔曲线（未完成）:\n";
    codeStr += generateBezierCode(state.bezierPoints);
  }
  state.codeEditor.value = codeStr;
}


export function generateCode(stroke) {
  if (stroke.length === 0) return "";
  let codeStr = "// 画笔路径\n";
  codeStr += "ctx.beginPath();\n";
  codeStr += `ctx.moveTo(${stroke[0].x}, ${stroke[0].y});\n`;
  for (let i = 1; i < stroke.length; i++) {
    codeStr += `ctx.lineTo(${stroke[i].x}, ${stroke[i].y});\n`;
  }
  codeStr += "ctx.stroke();\n";
  return codeStr;
}


export function generateBezierCode(points) {
  if (points.length !== 4) return "";
  let codeStr = "// 贝塞尔曲线路径\n";
  codeStr += "ctx.save();\n";
  codeStr += "ctx.beginPath();\n";
  codeStr += `ctx.moveTo(${points[0].x}, ${points[0].y});\n`;
  codeStr += `ctx.bezierCurveTo(${points[1].x}, ${points[1].y}, ${points[2].x}, ${points[2].y}, ${points[3].x}, ${points[3].y});\n`;
  codeStr += "ctx.stroke();\n";
  codeStr += "ctx.restore();\n";
  return codeStr;
}


export function removeErasedDrawings() {
  const threshold = state.eraserSize;


  let remainingBrushStrokes = [];
  let remainingBrushCodes = [];
  for (let i = 0; i < state.brushStrokes.length; i++) {
    const stroke = state.brushStrokes[i];
    let erased = false;
    for (let j = 0; j < state.eraserStrokes.length; j++) {
      const eStroke = state.eraserStrokes[j];
      for (let k = 0; k < stroke.length; k++) {
        for (let m = 0; m < eStroke.length; m++) {
          const dx = stroke[k].x - eStroke[m].x;
          const dy = stroke[k].y - eStroke[m].y;
          if (Math.hypot(dx, dy) < threshold) {
            erased = true;
            break;
          }
        }
        if (erased) break;
      }
      if (erased) break;
    }
    if (!erased) {
      remainingBrushStrokes.push(stroke);
      remainingBrushCodes.push(state.brushCodes[i]);
    }
  }
  state.brushStrokes = remainingBrushStrokes;
  state.brushCodes = remainingBrushCodes;


  let remainingBezierCurves = [];
  let remainingBezierCodes = [];
  for (let i = 0; i < state.bezierCurves.length; i++) {
    const curve = state.bezierCurves[i];
    let erased = false;
    for (let j = 0; j < state.eraserStrokes.length; j++) {
      const eStroke = state.eraserStrokes[j];
      for (let k = 0; k < curve.length; k++) {
        for (let m = 0; m < eStroke.length; m++) {
          const dx = curve[k].x - eStroke[m].x;
          const dy = curve[k].y - eStroke[m].y;
          if (Math.hypot(dx, dy) < threshold) {
            erased = true;
            break;
          }
        }
        if (erased) break;
      }
      if (erased) break;
    }
    if (!erased) {
      remainingBezierCurves.push(curve);
      remainingBezierCodes.push(state.bezierCodes[i]);
    }
  }
  state.bezierCurves = remainingBezierCurves;
  state.bezierCodes = remainingBezierCodes;
}


export function drawStroke(ctx, stroke, composite, lineW, color) {
  if (stroke.length === 0) return;
  ctx.save();
  ctx.globalCompositeOperation = composite;
  ctx.lineWidth = lineW;
  ctx.strokeStyle = composite === 'destination-out' ? 'rgba(0,0,0,1)' : color;
  ctx.beginPath();
  ctx.moveTo(stroke[0].x, stroke[0].y);
  for (let i = 1; i < stroke.length; i++) {
    ctx.lineTo(stroke[i].x, stroke[i].y);
  }
  ctx.stroke();
  ctx.restore();
}


export function drawBezierCurveAndControlPoints(points) {
  const ctx = state.drawCtx;
  if (points.length >= 2) {
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
    ctx.restore();
  }
  if (points.length >= 3) {
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.stroke();
    ctx.restore();
  }
  if (points.length === 4) {
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = state.colorPicker.value;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
    ctx.stroke();
    ctx.restore();
  }
  points.forEach((p, i) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = (i === 0 || i === 3) ? 'blue' : 'green';
    ctx.fill();
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`P${i} (${p.x},${p.y})`, p.x + 8, p.y - 8);
    ctx.restore();
  });
}


export function drawGrid() {
  const { gridCtx, gridCanvas } = state;
  const step = 50;
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  gridCtx.strokeStyle = '#ddd';
  gridCtx.lineWidth = 0.5;
  for (let x = 0; x <= gridCanvas.width; x += step) {
    gridCtx.beginPath();
    gridCtx.moveTo(x, 0);
    gridCtx.lineTo(x, gridCanvas.height);
    gridCtx.stroke();
  }
  for (let y = 0; y <= gridCanvas.height; y += step) {
    gridCtx.beginPath();
    gridCtx.moveTo(0, y);
    gridCtx.lineTo(gridCanvas.width, y);
    gridCtx.stroke();
  }
}


export function drawAxes() {
  const ctx = state.gridCtx;
  ctx.save();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(state.gridCanvas.width, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, state.gridCanvas.height);
  ctx.stroke();
  for (let x = 0; x <= state.gridCanvas.width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 5);
    ctx.stroke();
    ctx.fillText(x, x, 15);
  }
  for (let y = 0; y <= state.gridCanvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(5, y);
    ctx.stroke();
    ctx.fillText(y, 15, y);
  }
  ctx.restore();
}


export function resizeCanvases() {
  const width = state.canvasContainer.clientWidth || 600;
  const height = state.canvasContainer.clientHeight || 400;
  state.gridCanvas.width = width;
  state.gridCanvas.height = height;
  state.drawCanvas.width = width;
  state.drawCanvas.height = height;
  drawGrid();
  drawAxes();
  redrawDrawing();
}


export function getCanvasPoint(e) {
  const rect = state.drawCanvas.getBoundingClientRect();
  const scaleX = state.drawCanvas.width / rect.width;
  const scaleY = state.drawCanvas.height / rect.height;
  return {
    x: Math.round((e.clientX - rect.left) * scaleX),
    y: Math.round((e.clientY - rect.top) * scaleY)
  };
}


export function redrawDrawing() {
  state.drawCtx.clearRect(0, 0, state.drawCanvas.width, state.drawCanvas.height);
  const color = state.colorPicker.value;
  state.brushStrokes.forEach(stroke => {
    drawStroke(state.drawCtx, stroke, 'source-over', 2, color);
  });
  state.eraserStrokes.forEach(stroke => {
    drawStroke(state.drawCtx, stroke, 'destination-out', state.eraserSize, color);
  });
  state.codeGeneratedShapes.forEach(shape => {
    try {
      new Function("ctx", shape)(state.drawCtx);
    } catch (error) {
      console.error("绘制代码生成图形时出错: ", error);
    }
  });
  state.bezierCurves.forEach(curve => {
    drawBezierCurveAndControlPoints(curve);
  });
  if (state.bezierPoints.length > 0) {
    drawBezierCurveAndControlPoints(state.bezierPoints);
  }
}


export function setupCanvas() {
  state.drawCanvas.addEventListener('mousedown', (e) => {
    const pt = getCanvasPoint(e);
    if (state.dragMode) {
      let found = false;
      for (let i = 0; i < state.bezierPoints.length; i++) {
        if (Math.hypot(state.bezierPoints[i].x - pt.x, state.bezierPoints[i].y - pt.y) < 10) {
          state.draggingControl = { source: 'current', index: i };
          found = true;
          break;
        }
      }
      if (!found) {
        for (let j = 0; j < state.bezierCurves.length; j++) {
          const curve = state.bezierCurves[j];
          for (let i = 0; i < curve.length; i++) {
            if (Math.hypot(curve[i].x - pt.x, curve[i].y - pt.y) < 10) {
              state.draggingControl = { source: 'stored', curveIndex: j, pointIndex: i };
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }
      return;
    } else if (state.bezierMode) {
      let pointFound = false;
      for (let i = 0; i < state.bezierPoints.length; i++) {
        if (Math.hypot(state.bezierPoints[i].x - pt.x, state.bezierPoints[i].y - pt.y) < 10) {
          state.draggingPoint = i;
          pointFound = true;
          break;
        }
      }
      if (!pointFound && state.bezierPoints.length < 4) {
        state.bezierPoints.push(pt);
        redrawDrawing();
      }
    } else if (state.eraserMode) {
      state.isErasing = true;
      state.currentStroke = [pt];
    } else if (state.brushMode) {
      state.isDrawing = true;
      state.currentStroke = [pt];
    }
  });

  state.drawCanvas.addEventListener('mousemove', (e) => {
    const pt = getCanvasPoint(e);
    state.coordinateDisplay.textContent = `X: ${pt.x}, Y: ${pt.y}`;
    state.tooltip.style.display = 'block';
    state.tooltip.textContent = `X: ${pt.x}, Y: ${pt.y}`;
    state.tooltip.style.left = (e.clientX + 15) + 'px';
    state.tooltip.style.top = (e.clientY - 15) + 'px';

    if (state.dragMode && state.draggingControl) {
      if (state.draggingControl.source === 'current') {
        state.bezierPoints[state.draggingControl.index] = pt;
      } else if (state.draggingControl.source === 'stored') {
        state.bezierCurves[state.draggingControl.curveIndex][state.draggingControl.pointIndex] = pt;
        state.bezierCodes[state.draggingControl.curveIndex] = generateBezierCode(state.bezierCurves[state.draggingControl.curveIndex]);
      }
      updateCodeEditor();
      redrawDrawing();
    } else if (state.bezierMode && state.draggingPoint !== null) {
      state.bezierPoints[state.draggingPoint] = pt;
      redrawDrawing();
      updateCodeEditor();
    } else if (state.isErasing && state.eraserMode) {
      state.currentStroke.push(pt);
      redrawDrawing();
    } else if (state.isDrawing && state.brushMode) {
      state.currentStroke.push(pt);
      redrawDrawing();
    }
  });

  state.drawCanvas.addEventListener('mouseup', () => {
    if (state.dragMode) {
      state.draggingControl = null;
    } else if (state.bezierMode) {
      state.draggingPoint = null;
      if (state.bezierPoints.length === 4) {
        state.bezierCurves.push(state.bezierPoints.slice());
        state.bezierCodes.push(generateBezierCode(state.bezierPoints));
        state.bezierPoints = [];
        updateCodeEditor();
      }
    } else if (state.eraserMode && state.isErasing) {
      state.isErasing = false;
      state.eraserStrokes.push(state.currentStroke.slice());
      removeErasedDrawings();
      updateCodeEditor();
    } else if (state.brushMode && state.isDrawing) {
      state.isDrawing = false;
      state.brushStrokes.push(state.currentStroke.slice());
      state.brushCodes.push(generateCode(state.currentStroke));
      updateCodeEditor();
    }
    redrawDrawing();
  });

  state.drawCanvas.addEventListener('mouseout', () => {
    state.tooltip.style.display = 'none';
  });

  resizeCanvases();
}
