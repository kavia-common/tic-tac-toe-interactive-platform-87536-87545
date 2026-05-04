import React from 'react';
import Square from './Square';
import './Board.css';

/**
 * The 3×3 Tic-Tac-Toe board.
 *
 * @param {Object}         props
 * @param {Array<string|null>} props.squares    - 9-element array of 'X', 'O', or null
 * @param {Function}           props.onSquareClick - Callback with the clicked index
 * @param {number[]|null}      props.winningLine   - Indices of winning squares (or null)
 * @param {boolean}            props.gameOver      - Whether the game has ended
 */
// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, winningLine, gameOver }) {
  /**
   * Render a single square, determining whether it is part of the win line.
   *
   * @param {number} index
   */
  function renderSquare(index) {
    const isWinning = winningLine ? winningLine.includes(index) : false;
    const disabled = gameOver || Boolean(squares[index]);

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onSquareClick(index)}
        isWinning={isWinning}
        disabled={disabled}
      />
    );
  }

  return (
    <div className="board" aria-label="Tic-Tac-Toe board">
      {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
    </div>
  );
}

export default Board;
