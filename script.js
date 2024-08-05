const main = document.querySelector("#main");
const table = document.querySelector("#table");
const inpTarefa = document.querySelector("#tarefa");
const inpData = document.querySelector("#data");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const deletar = document.querySelector(".deletar");
const span = document.querySelector(".span");
const spanTarefa = document.querySelector("#spanTarefa");
const spanData = document.querySelector("#spanData");
const qtdTarefas = document.querySelector("#qtdTarefas");

let tarefasJson = JSON.parse(localStorage.getItem("tarefas")) || [];

let quantidade_tarefas = tarefasJson.length || 0;

let modoAtualizacao = false

let idTarefaAtualizada;

let tarefaVazio = false
let dataVazio = false

if (tarefasJson.length > 0) {
    renderizarTabela();   
}

function renderizarTabela() {

    if (tarefasJson.length > 0) {
        table.innerHTML = "";

    qtdTarefas.textContent = `Quantidade de tarefas: ${quantidade_tarefas}`

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
            quantidade_tarefas = tarefasJson.length
            renderizarTabela();   
            renderizarToast("Removido com sucesso!");
        })

        editar.addEventListener('click', (f) => {
            spanTarefa.className = "span hidden"
            spanData.className = "span hidden"
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
    } else {
        qtdTarefas.innerHTML = ""
        table.innerHTML = "";
    }
}

function renderizarToast(texto) {
    if (tarefaVazio || dataVazio) {
        return
    }
    let toast = document.createElement("div");
    toast.textContent = texto;
    toast.className = "toast";
    main.appendChild(toast)
    setTimeout(() => {
        main.removeChild(toast)
    }, 3000);
}

function adicionarTarefa(id) {
    if (inpTarefa.value == "") {
        tarefaVazio = true
        campoTarefaVazio()
    }
    if (inpData.value.length == 0) {
        dataVazio = true
        campoDataVazio()
    }
    if (modoAtualizacao) {
        if (tarefaVazio || dataVazio) {
            return
        }
        let tarefa = {
            id: id,
            tarefa: inpTarefa.value,
            data: inpData.value
        }
        let index = tarefasJson.findIndex((e) => e.id == id);
        tarefasJson.splice(index, 1, tarefa)
        let tarefasString = JSON.stringify(tarefasJson)
        localStorage.setItem("tarefas", tarefasString)
        quantidade_tarefas = tarefasJson.length
        renderizarTabela();
        renderizarToast("Atualizado com sucesso!");
    } else {
        if (tarefaVazio || dataVazio) {
            return
        }
        let tarefa = {
            id: Math.floor((Math.random() * 10000) + 1),
            tarefa: inpTarefa.value,
            data: inpData.value
        }
        tarefasJson.push(tarefa)
        let tarefasString = JSON.stringify(tarefasJson)
        localStorage.setItem("tarefas", tarefasString)
        quantidade_tarefas = tarefasJson.length
        renderizarTabela();
        renderizarToast("Cadastrado com sucesso!");
    }

    modoAtualizacao = false;
    inpTarefa.value = "";
    inpData.value = "";

}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    adicionarTarefa(idTarefaAtualizada);
});

function campoTarefaVazio() {
    spanTarefa.className = "span visible"
}

function campoDataVazio() {
    spanData.className = "span visible"
}

inpTarefa.addEventListener('click', () => {
    tarefaVazio = false
    spanTarefa.className = "span hidden"
})

inpData.addEventListener('click', () => {
    dataVazio = false
    spanData.className = "span hidden"
})