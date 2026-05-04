import React, { useState, useCallback } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import { calculateWinner, isDraw, createEmptyBoard } from '../utils/gameLogic';
import './Game.css';

/**
 * Top-level game container that manages:
 * - The current board state (9-square array)
 * - Whose turn it is (X or O)
 * - Win/draw detection
 * - Running scoreboard (X wins, O wins, draws)
 * - "New Game" and "Reset Scores" controls
 */
// PUBLIC_INTERFACE
function Game() {
  const [squares, setSquares] = useState(createEmptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ xWins: 0, oWins: 0, draws: 0 });

  /* Derived game state */
  const winResult = calculateWinner(squares);
  const draw = !winResult && isDraw(squares);
  const gameOver = Boolean(winResult) || draw;

  /**
   * Handle a player clicking a square.
   *
   * @param {number} index - Index of the clicked square (0-8)
   */
  // PUBLIC_INTERFACE
  const handleSquareClick = useCallback(
    (index) => {
      // Ignore click if square is already filled or game is over
      if (squares[index] || gameOver) return;

      const nextSquares = squares.slice();
      nextSquares[index] = xIsNext ? 'X' : 'O';
      setSquares(nextSquares);

      // Check for a winner after this move
      const newWin = calculateWinner(nextSquares);
      const newDraw = !newWin && nextSquares.every(Boolean);

      if (newWin) {
        setScores((prev) => ({
          ...prev,
          xWins: newWin.winner === 'X' ? prev.xWins + 1 : prev.xWins,
          oWins: newWin.winner === 'O' ? prev.oWins + 1 : prev.oWins,
        }));
      } else if (newDraw) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }

      setXIsNext((prev) => !prev);
    },
    [squares, xIsNext, gameOver]
  );

  /**
   * Reset the board for a new round while preserving scores.
   */
  // PUBLIC_INTERFACE
  const handleNewGame = useCallback(() => {
    setSquares(createEmptyBoard());
    setXIsNext(true);
  }, []);

  /**
   * Reset both the board and all scores.
   */
  // PUBLIC_INTERFACE
  const handleResetScores = useCallback(() => {
    setSquares(createEmptyBoard());
    setXIsNext(true);
    setScores({ xWins: 0, oWins: 0, draws: 0 });
  }, []);

  /* Status message */
  let statusMessage;
  if (winResult) {
    statusMessage = `🎉 Player ${winResult.winner} wins!`;
  } else if (draw) {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = `Player ${xIsNext ? 'X' : 'O'}'s turn`;
  }

  return (
    <div className="game">
      <h1 className="game__title">Tic-Tac-Toe</h1>

      {/* Running scoreboard */}
      <Scoreboard
        xWins={scores.xWins}
        oWins={scores.oWins}
        draws={scores.draws}
      />

      {/* Status bar */}
      <div
        className={`game__status ${gameOver ? 'game__status--over' : ''}`}
        aria-live="polite"
      >
        {statusMessage}
      </div>

      {/* The board */}
      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        winningLine={winResult ? winResult.line : null}
        gameOver={gameOver}
      />

      {/* Control buttons */}
      <div className="game__controls">
        <button
          className="game__btn game__btn--primary"
          onClick={handleNewGame}
          aria-label="Start a new game"
        >
          New Game
        </button>
        <button
          className="game__btn game__btn--secondary"
          onClick={handleResetScores}
          aria-label="Reset all scores"
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
}

export default Game;
