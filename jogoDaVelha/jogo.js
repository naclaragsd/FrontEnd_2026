import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { StrictMode } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import { useState } from "https://esm.sh/react";

// ─── Square ───────────────────────────────────────────────────
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// ─── Board ────────────────────────────────────────────────────
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Ignora clique se já há vencedor ou casa ocupada
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice(); // cópia imutável
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Vencedor: " + winner
    : "Próximo jogador: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// ─── Game (componente raiz) ────────────────────────────────────
function Game() {
  // history guarda todos os estados do tabuleiro já jogados
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // Descarta jogadas "futuras" ao voltar no tempo e jogar de novo
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  // Lista de botões para viagem no tempo
  const moves = history.map((squares, move) => {
    const description =
      move > 0 ? "Ir para jogada #" + move : "Ir para o início";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ─── Lógica de vitória ────────────────────────────────────────
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonais
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // retorna "X" ou "O"
    }
  }
  return null;
}

// ─── Render ───────────────────────────────────────────────────
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
