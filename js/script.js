let tabuleiro = ["", "", "", "", "", "", "", ""];

let jogadorAtual = "X";

let jogoAtivo = true;

const combinacoesDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const celulas = document.querySelectorAll(".celula");
const jogadorAtualTexto = document.getElementById("jogadorAtual");
const mensagemTexto = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("botaoReiniciar");

function jogar(evento) {
    const celulaClicada = evento.target;
    const indice = celulaClicada.getAttribute("data-index");

    if (!jogoAtivo || tabuleiro[indice] !== "") {
        return;
    }

    tabuleiro[indice] = jogadorAtual;
    celulaClicada.textContent = jogadorAtual;

    verificarResultado();
}

function verificarResultado() {
    let houveVitoria = false;

    for (let i = 0; i < combinacoesDeVitoria.length; i++) {
        const [a, b, c] = combinacoesDeVitoria[i];

        if (tabuleiro[a] !== "" && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            houveVitoria = true;
            break;
        }
    }

    if (houveVitoria) {
        mensagemTexto.textContent = "O jogador " + jogadorAtual + " venceu!";
        jogoAtivo = false;
        return;
    }

    const empate = !tabuleiro.includes("");

    if (empate) {
        mensagemTexto.textContent = "Empate!";
        jogoAtivo = false;
        return;
    }

    trocarJogador();
}

function trocarJogador() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    jogadorAtualTexto.textContent = jogadorAtual;
}

function reiniciarJogo() {
    tabuleiro = ["", "", "", "", "", "", "", ""];

    jogadorAtual = "X";

    jogoAtivo = true;

    mensagemTexto.textContent = "";
    jogadorAtualTexto.textContent = jogadorAtual;

    celulas.forEach(function (celula) {
        celula.textContent = "";
    });
}

celulas.forEach(function (celula) {
    celula.addEventListener("click", jogar);
});

botaoReiniciar.addEventListener("click", reiniciarJogo);