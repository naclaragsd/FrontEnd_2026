import React from "https://esm.sh/react"; // bilbioteca react
import { StrictMode, useState } from "https://esm.sh/react";
/* StricMode: modo de desenvolvimento que ajuda encontrar erros
   useState: Hook do React que permite guardar informações que podem mudar */
import { createRoot } from "https://esm.sh/react-dom/client";
// conecta react no html

function Square({ value, onSquareClick }) { /* 
componente que recebe duas prioridades 
value: que vai ser O ou X 
onSquareClick: função que vai ser executada quando clicar*/

  return ( //oq está dentro de return, aparecerá na tela
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
/* cria um botão com classe do css, que ao clicar, executa
onSquareClick {value} que vai mostrar o conteú do do quadrado*/

function calculateWinner(squares) { // recebe o tabuleiro inteiro
  const lines = [ //cria combinações vencedoras 
    [0, 1, 2], // linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonais
    [2, 4, 6]
  ];
/* Verifica se existe um vencedor.
 Recebe o array do tabuleiro e compara todas as
 combinações possíveis de vitória (linhas, colunas e diagonais).
 Retorna "X" ou "O" caso alguém tenha vencido.
 Retorna null se ainda não houver vencedor.
*/

  for (let i = 0; i < lines.length; i++) { //percorre combinações
    const [a, b, c] = lines[i]; //desestrutura o array

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

/* Componente principal do jogo.
 Armazena o estado do tabuleiro,
 controla de quem é a vez e exibe o jogo na tela.*/

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

/* Executada quando um quadrado é clicado.
 Verifica se a casa já está ocupada ou se já existe um vencedor.
 Caso contrário, marca X ou O na posição escolhida
 e passa a vez para o próximo jogador.
*/

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Vencedor: " + winner;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>

      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>

      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Board />
  </StrictMode>
);