const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
const botaoPlay = document.querySelector('.botao-play');
const tempo = document.querySelector('.tempo');

linkSobre.addEventListener('click', function () {
  ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', () => {
  imgs = imgs.reverse();
  if (play) {
    timer.parar();
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }
  botaoPlay.src = imgs[0];
});
