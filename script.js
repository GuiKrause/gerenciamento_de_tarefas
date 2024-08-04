const main = document.querySelector("#main");
const table = document.querySelector("#table");
const inpTarefa = document.querySelector("#tarefa");
const inpData = document.querySelector("#data");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const deletar = document.querySelector(".deletar");

let tarefas = []

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


    tarefas.forEach((e) => {
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

        tdTarefa.appendChild(tarefaValor);
        tdTarefa.className = "tdTarefa";

        tdData.appendChild(dataValor);

        tdOpcoes.className = "tdOpcoes";
        tdOpcoes.appendChild(deletar);
        tdOpcoes.appendChild(editar);

        // ------------------------------------

        deletar.addEventListener('click', (e) => {
            let idLivroDeletado = tarefas.findIndex((t) => t.id == e.target.id)
            tarefas.splice(idLivroDeletado, 1);
            renderizarTabela();
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
    })

    console.log(tarefas)
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

function editar(id) {

}

function adicionarTarefa() {
    let tarefa = {
        id: Math.floor((Math.random() * 10000) + 1),
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
    renderizarToast();
});