const { contextBridge, ipcRenderer } = require('electron')


function addAlunosPreload(pNome,pMatricula) {
    return ipcRenderer.invoke('inserir-alunos',pNome, pMatricula);
}

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function atualizarAlunosPreload(pId,pNome,pMatricula){
    return ipcRenderer.invoke('salvar-professor',pId,pNome,pMatricula)

}

function excluirAlunos(pID){
    return ipcRenderer.invoke('deletar-alunos',pID);
    
}

//Espaço usado para criar os professores

function addProfessorPreload(pNome,pCpf) {
    return ipcRenderer.invoke('inserir-alunos',pNome, pCpf);
}

function buscarProfessores() {
    return ipcRenderer.invoke('buscar-professor');
}

function atualizarProfessorPreload(pId,pNome,pCpf){
    return ipcRenderer.invoke('salvar-professore',pId,pNome,pCpf)

}

function excluirProfessor(pID){
    return ipcRenderer.invoke('deletar-professor',pID);
    
}

contextBridge.exposeInMainWorld('senacAPI',

    {
        addAlunosPreload: addAlunosPreload,
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        atualizarAlunosPreload : atualizarAlunosPreload,
        addProfessorPreload: addProfessorPreload,
        buscarProfessores: buscarProfessores,
        excluirProfessor: excluirProfessor,
        atualizarProfessorPreload : atualizarProfessorPreload

    }


)
