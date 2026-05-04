import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

/**
 * Basic smoke tests for the Tic-Tac-Toe application shell.
 */

test('renders the app header brand', () => {
  render(<App />);
  expect(screen.getAllByText(/Tic-Tac-Toe/i).length).toBeGreaterThanOrEqual(1);
});

test('renders the theme toggle button', () => {
  render(<App />);
  const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
  expect(toggleBtn).toBeInTheDocument();
});

test('theme toggle switches label between dark and light', () => {
  render(<App />);
  const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
  fireEvent.click(toggleBtn);
  expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
});

test('renders the game board with 9 squares', () => {
  render(<App />);
  const squares = screen.getAllByRole('button', { name: /square/i });
  expect(squares).toHaveLength(9);
});

test('renders scoreboard with Player X, Player O, and Draws', () => {
  render(<App />);
  expect(screen.getAllByText(/player x/i).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/player o/i).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/draws/i).length).toBeGreaterThanOrEqual(1);
});

test('shows "Player X\'s turn" status at the start', () => {
  render(<App />);
  expect(screen.getByText(/Player X's turn/i)).toBeInTheDocument();
});

test('clicking a square places an X marker', () => {
  render(<App />);
  const squares = screen.getAllByRole('button', { name: /empty square/i });
  fireEvent.click(squares[0]);
  expect(screen.getByRole('button', { name: /square with X/i })).toBeInTheDocument();
});

test('"New Game" button resets the board', () => {
  render(<App />);
  const emptySquares = screen.getAllByRole('button', { name: /empty square/i });
  fireEvent.click(emptySquares[0]);
  // After clicking, one square has X
  expect(screen.getByRole('button', { name: /square with X/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /start a new game/i }));
  // Board should be back to 9 empty squares
  expect(screen.getAllByRole('button', { name: /empty square/i })).toHaveLength(9);
});

test('"Reset Scores" button resets board and scores to zero', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /reset all scores/i }));
  // All scores should show 0
  const scoreValues = screen.getAllByText('0');
  expect(scoreValues.length).toBeGreaterThanOrEqual(3);
});
