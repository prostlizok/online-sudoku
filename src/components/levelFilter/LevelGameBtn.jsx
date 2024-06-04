import React from 'react';
import css from './LevelGameBtn.module.css';

const BtnCont = ({ switchDifficulty }) => {
  return (
    <div className={css.buttonLevel}>
      <button className={css.easyButton} onClick={() => switchDifficulty(20)}>
        Easy
      </button>
      <button className={css.mediumButton} onClick={() => switchDifficulty(40)}>
        Medium
      </button>
      <button className={css.expertButton} onClick={() => switchDifficulty(60)}>
        Expert
      </button>
    </div>
  );
};
export default BtnCont;
