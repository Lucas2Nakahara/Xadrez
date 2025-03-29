const pecas = {
    peao: "♙"
};

const tabuleiro = document.getElementById("tabuleiro");

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const casa = document.createElement("div");
        casa.classList.add("casa", (i + j) % 2 === 0 ? "cinza_claro" : "cinza");
        casa.setAttribute("ondrop", "drop(event)");
        casa.setAttribute("ondragover", "allowDrop(event)");
        
        if (i === 1 || i === 6) {
            const peca = document.createElement("span");
            peca.innerHTML = pecas.peao;
            peca.classList.add("peca");
            peca.setAttribute("draggable", "true");
            peca.setAttribute("ondragstart", "drag(event)");
            peca.id = `peca-${i}-${j}`;
            casa.appendChild(peca);
        }
        tabuleiro.appendChild(casa);
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const peca = document.getElementById(id);
    event.target.innerHTML = "";
    event.target.appendChild(peca);
}