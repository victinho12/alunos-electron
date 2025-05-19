const { contextBridge, ipcRenderer } = require('electron')

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function excluirAlunos(pID){
    return ipcRenderer.invoke('deletar-alunos',pID);
}

contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos

    }


)
