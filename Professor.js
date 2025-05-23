
const paragrafo = document.getElementById('teste');
const tabelaProfessor = document.getElementById('professorTableDados');
const modalNomeProfessor = document.getElementById('professor-nome');
const modalCpfProfessor = document.getElementById('professor-cpf');
const modalIDProfessor = document.getElementById('professor-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar')
const botaoLimpar = document.getElementById('btn-limpar')

botaoLimpar.addEventListener('click', limparProfessor)
botaoSalvar.addEventListener('click', verificarProfessorAdd)
botaoExcluir.addEventListener('click',excluirProfessorr)


function limparProfessor(){
    modalIDProfessor.value = ''
    modalCpfProfessor.value = ''
    modalNomeProfessor.value = ''
}

function mostrarDetalhes(nome,cpf,id){
    modalIDProfessor.value = id;
    modalCpfProfessor.value = cpf;
    modalNomeProfessor.value = nome ;
}

async function atualizarProfessor() {
    const pId = modalIDProfessor.value
    const pNome = modalNomeProfessor.value
    const pCpf = modalCpfProfessor.value
    const retorno = await window.senacAPI.atualizarAlunosPreload(pId,pNome,pCpf)
    mostrarDetalhes('','','')
    console.log("atualizar ", pId, pNome, pCpf);
    //após deleção atualiza a lista de professores
    carregarProfessores();
}

async function inserirProfessor(){
    const pNome = modalNomeProfessor.value;
    const pCpf = modalCpfProfessor.value;

    console.log("inserindo professor", pNome, pCpf);

    const retorno = await window.senacAPI.addProfessorPreload(pNome,pCpf);
    carregarProfessores()
}


function verificarProfessorAdd(){
    const pNome = modalNomeProfessor.value
    const pCpf = modalCpfProfessor.value
    if (!pNome || !pCpf){
        alert("Prencha todas as informações do professor!")
    }else{
        salvarProfessor()
    }
}

function salvarProfessor() {
    const pID = modalIDProfessor.value;
    if (pID) {
        atualizarProfessor();
    } else {
        inserirProfessor();
    }
}

async function excluirProfessorr(){
    const pID = modalIDProfessor.value;
    console.log("vou deletar o id ", pID);

    const retorno = await window.senacAPI.excluirProfessor(pID);
    modalIDProfessor.value = ''
    modalCpfProfessor.value = ''
    modalNomeProfessor.value = ''
    //após deleção atualiza a lista de alunos
    carregarProfessores();
}


async function carregarProfessores(){

    
    const listaProfessores = await window.senacAPI.buscarProfessores();
    tabelaProfessor.innerHTML = "";

     console.log(listaProfessores)
    listaProfessores.forEach(criarLinhaProfessor)

    if (! listaProfessores.length > 0 ){

        tabelaProfessor.textContent ="sem dados"
    }
    
    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaProfessor(professor){
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = professor.nome;
    linha.appendChild(celulanome);

    //cpf
    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = professor.cpf;   
    linha.appendChild(celulaCpf);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click", 
                                    function () { mostrarDetalhes(professor.nome,professor.cpf,professor.id)}
                                );
        
    
    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);
    

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaProfessor.appendChild(linha);
    
    

}




carregarProfessores()