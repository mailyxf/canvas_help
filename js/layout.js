export function buildLayout() {

  const container = document.createElement('div');
  container.className = 'container';


  const leftPanel = document.createElement('div');
  leftPanel.className = 'left-panel';
  leftPanel.innerHTML = `
    <div class="toolbar">
      <i id="toggleBrush" class="fa fa-pencil-alt" title="画笔"></i>
      <i id="toggleEraser" class="fa fa-eraser" title="橡皮擦"></i>
      <i id="drawBezier" class="fa fa-bezier-curve" title="贝塞尔曲线"></i>
      <i id="toggleDrag" class="fa fa-arrows-alt" title="拖拽"></i>
      <button id="clearCanvas">清空绘图</button>
      <input type="color" id="colorPicker" value="#000000">
      <input type="range" id="eraserSize" min="10" max="50" value="20">
    </div>
    <div id="canvasContainer">
      <canvas id="gridCanvas"></canvas>
      <canvas id="drawCanvas"></canvas>
    </div>
    <div id="coordinateDisplay">鼠标坐标将显示在这里</div>
  `;


  const rightPanel = document.createElement('div');
  rightPanel.className = 'right-panel';
  rightPanel.innerHTML = `
    <div class="code-panel">
      <div class="code-header">
        <button id="runCode">运行</button>
        <button id="copyCode">复制</button>
      </div>
      <textarea id="codeEditor">// 例如：绘制红色矩形
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
</textarea>
    </div>
  `;

  container.appendChild(leftPanel);
  container.appendChild(rightPanel);
  document.body.appendChild(container);


  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  document.body.appendChild(tooltip);
}
