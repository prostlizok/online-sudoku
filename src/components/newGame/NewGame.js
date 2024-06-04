import React from 'react';
import css from './NewGame.module.css';

const NewGameBtn = ({ newGame }) => {
  return (
    <button className={css.newGameButton} onClick={newGame}>
      New Game
    </button>
  );
};

export default NewGameBtn;
