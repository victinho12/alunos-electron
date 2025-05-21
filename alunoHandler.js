const { FishSymbol } = require('lucide');
const db = require('./db');
const { ipcMain } = require('electron')


async function addAlunosHendler(event,pNome,pMatricula) {
    console.log(event)
    const resultado = await  db.query('INSERT INTO public.alunos (nome, matricula) VALUES ($1, $2)', [pNome,pMatricula])
    return resultado.rows
    
}

async function buscarAlunos() {

    const resultado = await db.query('SELECT * FROM alunos order by id')

    return resultado.rows;

}

async function atualizaDadosAlunoHendler(event,pId,pNome,pMatricula) {
    console.log(event)
    const resultado = await  db.query('UPDATE public.alunos SET nome= $2 , matricula= $3 WHERE id = $1', [pId,pNome,pMatricula])
    return resultado.rows
}

async function deletarAluno(event,pId){    
    console.log('deletar',pId)
    console.log(event);
    const resultado = await db.query('DELETE FROM alunos WHERE ID = $1',[pId]);
    return resultado.rows;

}


function registrarAlunoHandler() {
    ipcMain.handle('inserir-alunos', addAlunosHendler)
    ipcMain.handle('salvar-alunos', atualizaDadosAlunoHendler)
    ipcMain.handle('buscar-alunos', buscarAlunos);
    ipcMain.handle('deletar-alunos', deletarAluno);
}

module.exports = {
    registrarAlunoHandler
}