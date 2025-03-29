const pecas = {
    torre: ["♖", "♜"],
    cavalo: ["♘", "♞"],
    bispo: ["♗", "♝"],
    rainha: ["♕", "♛"],
    rei: ["♔", "♚"],
    peao: ["♙", "♟"]
};

const layoutInicial = [
    ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre'],
    Array(8).fill('peao'),
    ...Array(4).fill(Array(8).fill(null)),
    Array(8).fill('peao'),
    ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre']
];

const tabuleiro = document.getElementById("tabuleiro");

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const casa = document.createElement("div");
        casa.classList.add("casa", (i + j) % 2 === 0 ? "cinza_claro" : "cinza");
        casa.setAttribute("ondrop", "drop(event)");
        casa.setAttribute("ondragover", "allowDrop(event)");
        
        const pecaNome = layoutInicial[i][j];
        if (pecaNome) {
            const peca = document.createElement("span");
            peca.innerHTML = pecas[pecaNome][i < 2 ? 1 : 0];
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
    if (event.target.classList.contains("casa")) {
        event.target.innerHTML = "";
        event.target.appendChild(peca);
    }
}