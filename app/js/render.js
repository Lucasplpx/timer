const { ipcRenderer } = require('electron');

const linkSobre = document.querySelector('#link-sobre');

linkSobre.addEventListener('click', () => {
  ipcRenderer.send('abrir-janela-sobre');
});
