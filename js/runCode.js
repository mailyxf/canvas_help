import { state, redrawDrawing } from './canvasSetup.js';

export function setupRunCode() {
  state.runCodeBtn.addEventListener('click', () => {
    try {
      const code = state.codeEditor.value;
      state.codeGeneratedShapes.push(code);
      new Function("ctx", code)(state.drawCtx);
    } catch (error) {
      alert("代码错误: " + error.message);
    }
  });

  const copyBtn = document.getElementById('copyCode');
  copyBtn.addEventListener('click', () => {
    state.codeEditor.select();
    document.execCommand('copy');
    alert('代码已复制到剪贴板');
  });
}
