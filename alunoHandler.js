const db = require('./db');
const { ipcMain } = require('electron')

async function buscarAlunos() {

    const resultado = await db.query('SELECT * FROM alunos order by id')

    return resultado.rows;

}

async function deletarAluno(event,pId){    
    console.log('deletar ',pId)
    console.log(event);
    const resultado = await db.query('DELETE FROM alunos WHERE ID = $1',[pId]);
    return resultado.rows;

}


function registrarAlunoHandler() {
    ipcMain.handle('buscar-alunos', buscarAlunos);
    ipcMain.handle('deletar-alunos', deletarAluno);
}

module.exports = {
    registrarAlunoHandler
}