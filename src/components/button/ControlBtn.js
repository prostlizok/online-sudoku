import React from 'react';
import css from './ControlBtn.module.css';

const ControlBtnCont = ({ solveSudoku, resetSudoku, checkSudoku }) => {
  return (
    <div className={css.buttonContainer}>
      <button className={css.checkButton} onClick={checkSudoku}>
        Check
      </button>
      <button className={css.solveButton} onClick={solveSudoku}>
        Solve
      </button>
      <button className={css.resetButton} onClick={resetSudoku}>
        Reset
      </button>
    </div>
  );
};
export default ControlBtnCont;
