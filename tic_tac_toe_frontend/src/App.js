import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import './App.css';

/**
 * Root application component.
 *
 * Provides:
 * - Light/dark theme management (persisted on <html> via data-theme attribute)
 * - A top navigation bar with the app brand name and theme toggle button
 * - The main <Game /> component that handles all Tic-Tac-Toe logic
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  /* Apply the current theme to the root <html> element */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes.
   */
  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      {/* ── Top navigation bar ── */}
      <header className="App-header">
        <span className="App-header__brand">🎮 Tic-Tac-Toe</span>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      {/* ── Main game area ── */}
      <main className="App-main">
        <Game />
      </main>
    </div>
  );
}

export default App;
