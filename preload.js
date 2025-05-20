const { contextBridge, ipcRenderer } = require('electron')

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function atualizarAlunosPreload(pId,pNome,pMatricula){
    return ipcRenderer.invoke('salvar-alunos',pId,pNome,pMatricula)
}

function excluirAlunos(pID){
    return ipcRenderer.invoke('deletar-alunos',pID);
}

contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        atualizarAlunosPreload : atualizarAlunosPreload

    }


)
