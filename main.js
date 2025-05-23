const { app, BrowserWindow } = require('electron');
const path = require('path');
const { registrarProfessorHandler } = require('./professorHendler')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon : path.join(__dirname, 'assets', 'img.goku.jpg' ),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('professor.html');
}

app.whenReady().then(function () {

    createMainWindow();
    registrarProfessorHandler();

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
