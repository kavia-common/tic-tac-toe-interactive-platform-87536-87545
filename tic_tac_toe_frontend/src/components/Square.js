import React from 'react';
import './Square.css';

/**
 * A single cell on the Tic-Tac-Toe board.
 *
 * @param {Object}   props
 * @param {string|null} props.value       - 'X', 'O', or null
 * @param {Function}    props.onClick     - Called when the square is clicked
 * @param {boolean}     props.isWinning   - Whether this square is part of the winning line
 * @param {boolean}     props.disabled    - Whether clicks are disabled (game over or already filled)
 */
// PUBLIC_INTERFACE
function Square({ value, onClick, isWinning, disabled }) {
  const classNames = [
    'square',
    value === 'X' ? 'square--x' : value === 'O' ? 'square--o' : '',
    isWinning ? 'square--winning' : '',
    disabled && !value ? 'square--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}

export default Square;
