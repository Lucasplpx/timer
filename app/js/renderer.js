const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
const botaoPlay = document.querySelector('.botao-play');
const tempo = document.querySelector('.tempo');
const curso = document.querySelector('.curso').innerText;

window.onload = () => {
  data.pegaDados(curso).then((dados) => {
    console.log(dados);
    tempo.textContent = dados.tempo;
  });
};

linkSobre.addEventListener('click', function () {
  ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', () => {
  imgs = imgs.reverse();
  if (play) {
    timer.parar(curso);
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }
  botaoPlay.src = imgs[0];
});
