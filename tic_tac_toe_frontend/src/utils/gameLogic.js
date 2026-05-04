/**
 * Game logic utilities for Tic-Tac-Toe.
 * Provides win detection across all 8 possible lines and draw detection.
 */

/** All 8 winning combinations (indices into the 9-square board array) */
const WIN_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left → bottom-right
  [2, 4, 6], // diagonal top-right → bottom-left
];

/**
 * Determine whether there is a winner on the current board.
 *
 * @param {Array<string|null>} squares - 9-element array of 'X', 'O', or null.
 * @returns {{ winner: string, line: number[] } | null}
 *   An object with the winning player symbol and the indices of the winning
 *   squares, or null if there is no winner yet.
 */
// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  for (const [a, b, c] of WIN_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/**
 * Determine whether the board is a draw (all squares filled, no winner).
 *
 * @param {Array<string|null>} squares - 9-element array.
 * @returns {boolean} true if the game is a draw.
 */
// PUBLIC_INTERFACE
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

/**
 * Return a fresh, empty board (9 nulls).
 *
 * @returns {Array<null>}
 */
// PUBLIC_INTERFACE
export function createEmptyBoard() {
  return Array(9).fill(null);
}
