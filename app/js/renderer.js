const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
const botaoPlay = document.querySelector('.botao-play');
const tempo = document.querySelector('.tempo');
const curso = document.querySelector('.curso');
const botaoAdicionar = document.querySelector('.botao-adicionar');
const campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {
  data.pegaDados(curso.textContent).then((dados) => {
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
    timer.parar(curso.textContent);
    play = false;
    new Notification('Alura Timer', {
      body: `O curso ${curso.textContent} parado !!!`,
      icon: 'img/icon.png',
    });
  } else {
    timer.iniciar(tempo);
    play = true;
    new Notification('Alura Timer', {
      body: `O curso ${curso.textContent} iniciado !!!`,
      icon: 'img/icon.png',
    });
  }
  botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado', (event, curso) => {
  data.pegaDados(curso).then((dados) => {
    tempo.textContent = dados.tempo;
  });
  document.querySelector('.curso').textContent = curso;
});

botaoAdicionar.addEventListener('click', () => {
  let novoCurso = campoAdicionar.value;
  curso.textContent = novoCurso;
  tempo.textContent = '00:00:00';
  campoAdicionar.value = '';
  ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('atalho-iniciar-parar', () => {
  let click = new MouseEvent('click');
  botaoPlay.dispatchEvent(click);
});
