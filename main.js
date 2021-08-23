const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;
let mainWindow = null;
app.on('ready', () => {
  console.log('App started');
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });
  tray = new Tray(`${__dirname}/app/img/icon.png`);
  let template = templateGenerator.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);

  let templateMenu = templateGenerator.geraMenuPrincipalTemplate();
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
  if (sobreWindow == null) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 250,
      alwaysOnTop: true,
      frame: false,
    });

    sobreWindow.on('closed', () => {
      sobreWindow = null;
    });
  }
  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
  console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
  data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoNoTray(
    novoCurso,
    mainWindow
  );
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
});
