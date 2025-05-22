

const paragrafo = document.getElementById('teste');
const tabelaAluno = document.getElementById('alunosTableDados');
const modalNomeAluno = document.getElementById('aluno-nome');
const modalMatriculaAluno = document.getElementById('aluno-matricula');
const modalIDAluno = document.getElementById('aluno-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar')
const botaoLimpar = document.getElementById('btn-limpar')

botaoLimpar.addEventListener('click', limparAluno)
botaoSalvar.addEventListener('click', verificarAlunoAdd)
botaoExcluir.addEventListener('click',excluirAluno)


function limparAluno(){
    modalIDAluno.value = ''
    modalMatriculaAluno.value = ''
    modalNomeAluno.value = ''
}

function mostrarDetalhes(nome,matricula,id){
    modalIDAluno.value = id;
    modalMatriculaAluno.value = matricula;
    modalNomeAluno.value = nome ;
}

async function atualizarAlunos() {
    const pId = modalIDAluno.value
    const pNome = modalNomeAluno.value
    const pMatricula = modalMatriculaAluno.value
    const retorno = await window.senacAPI.atualizarAlunosPreload(pId,pNome,pMatricula)
    modalIDAluno.value = ''
    modalMatriculaAluno.value = ''
    modalNomeAluno.value = ''
    console.log("atualizar ", pId, pNome, pMatricula);
    //após deleção atualiza a lista de alunos
    carregarAlunos();
}

async function inserirAluno(){
    const pNome = modalNomeAluno.value;
    const pMatricula = modalMatriculaAluno.value;

    console.log("inserindo aluno", pNome, pMatricula);

    const retorno = await window.senacAPI.addAlunosPreload(pNome,pMatricula);
    carregarAlunos()
}


function verificarAlunoAdd(){
    const pNome = modalNomeAluno.value
    const pMatricula = modalMatriculaAluno.value
    if (!pNome || !pMatricula){
        console.log("Prencha todas as informações do aluno!")
    }else{
        salvarAluno()
    }
}

function salvarAluno() {
    const pID = modalIDAluno.value;
    if (pID) {
        atualizarAlunos();
    } else {
        inserirAluno();
    }
}

async function excluirAluno(){
    const pID = modalIDAluno.value;
    console.log("vou deletar o id ", pID);

    const retorno = await window.senacAPI.excluirAlunos(pID);
    modalIDAluno.value = ''
    modalMatriculaAluno.value = ''
    modalNomeAluno.value = ''
    //após deleção atualiza a lista de alunos
    carregarAlunos();
}


async function carregarAlunos(){

    
    const listaAlunos = await window.senacAPI.buscarAlunos();
    tabelaAluno.innerHTML = "";

     console.log(listaAlunos)
    listaAlunos.forEach(criarLinhaAluno)

    if (! listaAlunos.length > 0 ){

        tabelaAluno.textContent ="sem dados"
    }
    
    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaAluno(aluno){
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = aluno.nome;
    linha.appendChild(celulanome);

    //matricula
    const celulaMatricula = document.createElement("td");
    celulaMatricula.textContent = aluno.matricula;   
    linha.appendChild(celulaMatricula);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click", 
                                    function () { mostrarDetalhes(aluno.nome,aluno.matricula,aluno.id)}
                                );
        
    
    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);
    

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaAluno.appendChild(linha);
    
    

}




carregarAlunos()