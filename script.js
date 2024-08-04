const main = document.querySelector("#main");
const table = document.querySelector("#table");
const inpTarefa = document.querySelector("#tarefa");
const inpData = document.querySelector("#data");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");

let tarefas = []

renderizarTabela();

function renderizarTabela() {
    tarefas.forEach(() => {
        let tr = document.createElement("tr");

        let tdTarefa = document.createElement("td");
        let tdData = document.createElement("td");
        let tdOpcoes = document.createElement("td");

        let deletar = document.createElement("div");
        let editar = document.createElement("div");

        const tarefaValor = document.createTextNode(tarefas[tarefas.length - 1].tarefa);
        const dataValor = document.createTextNode(tarefas[tarefas.length - 1].data);

        deletar.textContent = "Deletar";
        deletar.className = "opcoes deletar"

        editar.textContent = "Editar";
        editar.className = "opcoes editar"

        tdTarefa.appendChild(tarefaValor);
        tdTarefa.className = "tdTarefa";

        tdData.appendChild(dataValor);

        tdOpcoes.className = "tdOpcoes";
        tdOpcoes.appendChild(deletar);
        tdOpcoes.appendChild(editar);

        // ------------------------------------

        deletar.addEventListener('click', () => {
            document.getElementById(id).remove()
        })

        editar.addEventListener('click', (e) => {
            let tarefa = document.getElementById(`${tr.id}`)
            const id = tarefa.id;
            const tarefaNoArray = tarefas.find((e) => e.id == id)
    
            tarefa.value = tarefaNoArray.tarefa
            data.value = tarefaNoArray.data
    
            tarefaAtualizado.id = tarefaNoArray.id
        })

        // ------------------------------------

        tr.appendChild(tdTarefa);
        tr.appendChild(tdData);
        tr.appendChild(tdOpcoes);
        tr.id = tarefas[tarefas.length - 1].id
        table.appendChild(tr);

        deletarTarefa(tr.id);
    })
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

function deletarTarefa(id) {
    
}

function editar(id) {
    
}

function adicionarTarefa() {
    let tarefa = {
        id: Math.floor((Math.random() * 1000) + 1),
        tarefa: inpTarefa.value,
        data: inpData.value
    }

    tarefas.push(tarefa)

    inpTarefa.value = "";
    inpData.value = "";
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    
    adicionarTarefa();
    renderizarTabela();
});