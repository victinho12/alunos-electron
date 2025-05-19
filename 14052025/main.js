const { app, BrowserWindow } = require('electron');
const path = require('path');
const { registrarAlunoHandler } = require('./alunoHandler')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('aluno.html');
}

app.whenReady().then(function () {

    createMainWindow();
    registrarAlunoHandler();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

}
);


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
