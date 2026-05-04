import React from 'react';
import './Scoreboard.css';

/**
 * Displays the running score for Player X, Player O, and draws.
 *
 * @param {Object} props
 * @param {number} props.xWins   - Number of rounds won by X
 * @param {number} props.oWins   - Number of rounds won by O
 * @param {number} props.draws   - Number of drawn rounds
 */
// PUBLIC_INTERFACE
function Scoreboard({ xWins, oWins, draws }) {
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <div className="scoreboard__item scoreboard__item--x">
        <span className="scoreboard__label">Player X</span>
        <span className="scoreboard__value">{xWins}</span>
      </div>
      <div className="scoreboard__item scoreboard__item--draw">
        <span className="scoreboard__label">Draws</span>
        <span className="scoreboard__value">{draws}</span>
      </div>
      <div className="scoreboard__item scoreboard__item--o">
        <span className="scoreboard__label">Player O</span>
        <span className="scoreboard__value">{oWins}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
