export function addGlobalStyles() {
  const style = document.createElement('style');
  style.textContent = `

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #eee;
      overflow: hidden;
    }

    .container {
      display: flex;
      gap: 20px;
      height: 100vh;
      box-sizing: border-box;
      padding: 20px;
    }

    .left-panel {
      flex: 2;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .right-panel {
      flex: 1;
      min-width: 300px;
      display: flex;
      flex-direction: column;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ccc;
      position: relative;
      z-index: 1000;
      pointer-events: auto;
    }
    .toolbar i {
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
    }
    .toolbar button {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }
    .toolbar button:hover {
      background-color: #45a049;
    }
    .toolbar input[type="color"],
    .toolbar input[type="range"] {
      cursor: pointer;
    }

    #canvasContainer {
      flex: 1;
      position: relative;
      margin: 10px 0;
      border: 1px solid #ccc;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    canvas {
      position: absolute;
      left: 0;
      top: 0;
    }
    #gridCanvas {
      z-index: 1;
      background-color: #f8f8f8;
    }
    #drawCanvas {
      z-index: 2;
    }

    #coordinateDisplay {
      padding: 5px 10px;
      background-color: #fff;
      border-top: 1px solid #ccc;
      text-align: center;
      font-size: 14px;
      color: #666;
    }

    #tooltip {
      position: fixed;
      z-index: 10000;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 12px;
      pointer-events: none;
      display: none;
    }

    .toolbar i.active {
      background-color: #007acc;
      color: #fff;
      border-radius: 4px;
    }

    .code-panel {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: #2d2d2d;
      color: #ccc;
      border: 1px solid #333;
      border-radius: 4px;
      overflow: hidden;
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      background-color: #1e1e1e;
      padding: 5px 10px;
      border-bottom: 1px solid #333;
    }
    .code-header button {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      background-color: #007acc;
      color: white;
      cursor: pointer;
    }
    .code-header button:hover {
      background-color: #005a9e;
    }
    .code-panel textarea {
      flex: 1;
      width: 100%;
      padding: 10px;
      border: none;
      resize: none;
      font-family: Consolas, monospace;
      font-size: 14px;
      background-color: #2d2d2d;
      color: #ccc;
      outline: none;
    }
  `;
  document.head.appendChild(style);
}
