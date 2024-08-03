const table = document.querySelector("#table");
const main = document.querySelector("#main");
const tarefa = document.querySelector("#tarefa");
const data = document.querySelector("#data");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let livro = {
        tarefa: tarefa.value,
        data: data.value
    }

    let tr = document.createElement("tr");
    let tdTarefa = document.createElement("td");
    let tdData = document.createElement("td");
    let tdOpcoes = document.createElement("td");
    let toast = document.createElement("div");
    let deletar = document.createElement("div");
    let editar = document.createElement("div");

    const tarefaValor = document.createTextNode(livro.tarefa);
    const dataValor = document.createTextNode(livro.data);

    deletar.textContent = "Deletar";
    deletar.className = "opcoes deletar"

    editar.textContent = "Editar";
    editar.className = "opcoes editar"

    toast.textContent = "Cadastrado com sucesso!";
    toast.className = "toast";
    
    console.log(toast);
    
    tdTarefa.appendChild(tarefaValor);
    tdTarefa.className = "tdTarefa";

    tdData.appendChild(dataValor);

    tdOpcoes.className = "tdOpcoes";
    tdOpcoes.appendChild(deletar);
    tdOpcoes.appendChild(editar);

    tr.appendChild(tdTarefa);
    tr.appendChild(tdData);
    tr.appendChild(tdOpcoes);
    table.appendChild(tr);

    main.appendChild(toast)
    setTimeout(() => {
        main.removeChild(toast)
    }, 3000);

    tarefa.value = "";
    data.value = "";
})