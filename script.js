const main = document.querySelector("#main");
const tarefa = document.querySelector("#tarefa");
const data = document.querySelector("#data");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");

let livros = []

let livroAtualizado = {
    id: null,
    tarefa: null,
    data: null
}

let table = document.createElement("table");

function renderizarTabela(table) {

    let tr = document.createElement("tr")

    let thTarefa = document.createElement("th")
    thTarefa.id = "thTarefa";
    thTarefa.textContent = "Tarefa";

    let thData = document.createElement("th")
    thData.id = "thData";
    thData.textContent = "Data"

    let thOpcoes = document.createElement("th")
    thOpcoes.id = "thOpcoes";
    thOpcoes.textContent = "Opções"

    tr.appendChild(thTarefa)
    tr.appendChild(thData)
    tr.appendChild(thOpcoes)

    table.id = table;
    table.appendChild(tr)

    main.appendChild(table)

    submit.addEventListener('click', (e) => {
        e.preventDefault();

        let livro = {
            id: livroAtualizado.id || Math.floor((Math.random() * 1000) + 1),
            tarefa: tarefa.value,
            data: data.value
        }

        livroAtualizado.tarefa = tarefa.value;
        livroAtualizado.data = data.value;

        let index = livros.findIndex((e) => e.id == livroAtualizado.id)

        console.log(index)

        if (livroAtualizado.id !== null) {
            livros.splice(index, 0, livro)
        } else {
            livros.push(livro)
        }

        livroAtualizado.id = null;
        livroAtualizado.tarefa = null;
        livroAtualizado.data = null;

        let tr = document.createElement("tr");

        let tdTarefa = document.createElement("td");
        let tdData = document.createElement("td");
        let tdOpcoes = document.createElement("td");

        let toast = document.createElement("div");
        let deletar = document.createElement("div");
        let editar = document.createElement("div");

        const tarefaValor = document.createTextNode(livros[livros.length - 1].tarefa);
        const dataValor = document.createTextNode(livros[livros.length - 1].data);

        deletar.textContent = "Deletar";
        deletar.className = "opcoes deletar"

        editar.textContent = "Editar";
        editar.className = "opcoes editar"
        // editar.id = `${livros[livros.length - 1].id}`

        toast.textContent = "Cadastrado com sucesso!";
        toast.className = "toast";

        tdTarefa.appendChild(tarefaValor);
        tdTarefa.className = "tdTarefa";

        tdData.appendChild(dataValor);

        tdOpcoes.className = "tdOpcoes";
        tdOpcoes.appendChild(deletar);
        tdOpcoes.appendChild(editar);

        tr.appendChild(tdTarefa);
        tr.appendChild(tdData);
        tr.appendChild(tdOpcoes);
        tr.id = livros[livros.length - 1].id
        table.appendChild(tr);

        deletar.addEventListener('click', () => {
            document.getElementById(`${tr.id}`).remove()
        })

        editar.addEventListener('click', (e) => {
            let livro = document.getElementById(`${tr.id}`)
            const id = livro.id;
            const livroNoArray = livros.find((e) => e.id == id)

            tarefa.value = livroNoArray.tarefa
            data.value = livroNoArray.data

            livroAtualizado.id = livroNoArray.id
        })

        main.appendChild(toast)
        setTimeout(() => {
            main.removeChild(toast)
        }, 3000);

        tarefa.value = "";
        data.value = "";
    });
}



renderizarTabela(table, livros);