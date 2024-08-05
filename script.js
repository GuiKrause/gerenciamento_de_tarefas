const main = document.querySelector("#main");
const table = document.querySelector("#table");
const inpTarefa = document.querySelector("#tarefa");
const inpData = document.querySelector("#data");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const deletar = document.querySelector(".deletar");

// let tarefas = []

let tarefasJson = JSON.parse(localStorage.getItem("tarefas")) || [];

let modoAtualizacao = false

let idTarefaAtualizada;

renderizarTabela();

function renderizarTabela() {

    table.innerHTML = "";

    let trHead = document.createElement("tr");

    let thTarefa = document.createElement("th");
    thTarefa.textContent = "Tarefa";
    thTarefa.id = "thTarefa";

    let thData = document.createElement("th");
    thData.textContent = "Data de Conclusão";
    thData.id = "thData";

    let thOpcoes = document.createElement("th");
    thOpcoes.textContent = "Opções";
    thOpcoes.id = "thOpcoes";

    trHead.appendChild(thTarefa);
    trHead.appendChild(thData);
    trHead.appendChild(thOpcoes);

    table.appendChild(trHead)


    tarefasJson.forEach((e) => {
        let tr = document.createElement("tr");
        tr.className = "content"

        let tdTarefa = document.createElement("td");
        let tdData = document.createElement("td");
        let tdOpcoes = document.createElement("td");

        let deletar = document.createElement("div");
        let editar = document.createElement("div");

        const tarefaValor = document.createTextNode(e.tarefa);
        const dataValor = document.createTextNode(e.data);

        deletar.textContent = "Deletar";
        deletar.className = "opcoes deletar"
        deletar.id = e.id

        editar.textContent = "Editar";
        editar.className = "opcoes editar"
        editar.id = e.id

        tdTarefa.appendChild(tarefaValor);
        tdTarefa.className = "tdTarefa";

        tdData.appendChild(dataValor);

        tdOpcoes.className = "tdOpcoes";
        tdOpcoes.appendChild(deletar);
        tdOpcoes.appendChild(editar);

        // ------------------------------------

        deletar.addEventListener('click', (e) => {
            let idLivroDeletado = tarefasJson.findIndex((t) => t.id == e.target.id)
            tarefasJson.splice(idLivroDeletado, 1);
            let tarefasString = JSON.stringify(tarefasJson)
            localStorage.setItem("tarefas", tarefasString);
            renderizarTabela();
        })

        editar.addEventListener('click', (f) => {
            modoAtualizacao = true;
            idTarefaAtualizada = f.target.id;
            inpTarefa.value = e.tarefa;
            inpData.value = e.data;
        })

        // ------------------------------------

        tr.appendChild(tdTarefa);
        tr.appendChild(tdData);
        tr.appendChild(tdOpcoes);
        tr.id = e.id
        table.appendChild(tr);
    })

    console.log(tarefasJson)
}

function renderizarToast() {
    let toast = document.createElement("div");
    toast.textContent = "Cadastrado com sucesso!";
    toast.className = "toast";
    main.appendChild(toast)
    setTimeout(() => {
        main.removeChild(toast)
    }, 3000);
}

function adicionarTarefa(id) {
    if (modoAtualizacao) {
        let tarefa = {
            id: id,
            tarefa: inpTarefa.value,
            data: inpData.value
        }
        let index = tarefasJson.findIndex((e) => e.id == id);
        tarefasJson.splice(index, 1, tarefa)
        let tarefasString = JSON.stringify(tarefasJson)
        localStorage.setItem("tarefas", tarefasString)
        renderizarTabela()
    } else {
        let tarefa = {
            id: Math.floor((Math.random() * 10000) + 1),
            tarefa: inpTarefa.value,
            data: inpData.value
        }
        tarefasJson.push(tarefa)
        let tarefasString = JSON.stringify(tarefasJson)
        localStorage.setItem("tarefas", tarefasString)
        renderizarTabela()
    }

    modoAtualizacao = false;
    inpTarefa.value = "";
    inpData.value = "";
    
}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    adicionarTarefa(idTarefaAtualizada);
    renderizarTabela();
    renderizarToast();
});