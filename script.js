let tarefas = [];
let filtroAtual = "todas";

function adicionar() {
    const input = document.getElementById("input-tarefa");
    const texto = input.value.trim();

    if (texto === "") return;

    tarefas.push({
        texto: texto,
        concluida: false
    });

    input.value = "";
    renderizar();
}

function teclaEnter(event) {
    if (event.key === "Enter") {
        adicionar();
    }
}

function alternarStatus(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    renderizar();
}

function remover(indice) {
    tarefas.splice(indice, 1);
    renderizar();
}

function filtrar(tipo) {
    filtroAtual = tipo;

    document
        .querySelectorAll(".filtros button")
        .forEach(btn => btn.classList.remove("ativo"));

    document
        .getElementById(`btn-${tipo}`)
        .classList.add("ativo");

    renderizar();
}

function atualizarContador() {
    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    const contador = document.getElementById("contador");

    if (pendentes === 1) {
        contador.textContent = "1 tarefa pendente";
    } else {
        contador.textContent = `${pendentes} tarefas pendentes`;
    }
}

function renderizar() {
    const lista = document.getElementById("lista");
    const vazio = document.getElementById("vazio");

    lista.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(
            tarefa => !tarefa.concluida
        );
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.concluida
        );
    }

    if (tarefasFiltradas.length === 0) {
        vazio.style.display = "block";
    } else {
        vazio.style.display = "none";
    }

    tarefasFiltradas.forEach(tarefa => {
        const indiceOriginal = tarefas.indexOf(tarefa);

        const li = document.createElement("li");

        li.innerHTML = `
            <input
                type="checkbox"
                ${tarefa.concluida ? "checked" : ""}
                onchange="alternarStatus(${indiceOriginal})"
            >

            <span style="
                text-decoration: ${
                    tarefa.concluida ? "line-through" : "none"
                };
            ">
                ${tarefa.texto}
            </span>

            <button onclick="remover(${indiceOriginal})">
                ❌
            </button>
        `;

        lista.appendChild(li);
    });

    atualizarContador();
}

renderizar();