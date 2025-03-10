import { addGlobalStyles } from './style.js';
import { buildLayout } from './layout.js';
import { initDrawingTool } from './initDrawingTool.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
// link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
link.href = './css/all.min.css'
document.head.appendChild(link);

document.addEventListener('DOMContentLoaded', () => {
  addGlobalStyles();
  buildLayout();
  initDrawingTool();
});
