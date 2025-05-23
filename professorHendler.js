const { FishSymbol } = require('lucide');
const db = require('./db');
const { ipcMain } = require('electron')


async function addProfessoresHendler(event,pNome,pCpf) {
    console.log(event)
    const resultado = await  db.query('INSERT INTO public.professores (nome, cpf) VALUES ($1, $2)', [pNome,pCpf])
    return resultado.rows
    
}

async function buscarProfessores() {

    const resultado = await db.query('SELECT * FROM professores order by id')

    return resultado.rows;

}

async function atualizaDadosProfessorHendler(event,pId,pNome,pCpf) {
    console.log(event)
    const resultado = await  db.query('UPDATE public.professores SET nome= $2 , cpf= $3 WHERE id = $1', [pId,pNome,pCpf])
    return resultado.rows
}

async function deletarProfessor(event,pId){    
    console.log('deletar',pId)
    console.log(event);
    const resultado = await db.query('DELETE FROM professores WHERE ID = $1',[pId]);
    return resultado.rows;

}


function registrarProfessorHandler() {
    ipcMain.handle('inserir-professor', addProfessoresHendler)
    ipcMain.handle('salvar-professor', atualizaDadosProfessorHendler)
    ipcMain.handle('buscar-professor', buscarProfessores);
    ipcMain.handle('deletar-professor', deletarProfessor);
}

module.exports = {
    registrarProfessorHandler
}