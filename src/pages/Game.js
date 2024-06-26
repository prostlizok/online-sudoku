import css from './Game.module.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Table from '../components/sudokuField/Table.js';
import NewGameBtn from '../components/newGame/NewGame.js';
import Timer from '../components/timer/Timer.js';
import BtnCont from '../components/levelFilter/LevelGameBtn.js';
import ControlBtnCont from '../components/button/ControlBtn.js';
import {
  generateSudoku,
  getDeepCopy,
  removeCells,
  createEmptyGrid,
  checkValid,
  solver,
  validateSudokuSolution,
} from '../components/functionsSudoku.js';

const Game = () => {
  const [difficulty, setDifficulty] = useState(81);
  const [sudokuArr, setSudokuArr] = useState(createEmptyGrid());
  const [initialSudoku, setInitialSudoku] = useState(createEmptyGrid());
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialSudoku = generateSudoku();
    const sudokuWithRemovedCells = removeCells(initialSudoku, difficulty);
    const solved = getDeepCopy(initialSudoku);
    const solvedSuccessfully = solver(solved); 

    console.log("Generated Sudoku:", sudokuWithRemovedCells);
    console.log("Solved Sudoku:", solved);
    console.log("Was Solver Successful:", solvedSuccessfully);

    setSudokuArr(sudokuWithRemovedCells);
    setInitialSudoku(sudokuWithRemovedCells);

    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [difficulty, gameStarted]);

  function newGame() {
    const newSudoku = generateSudoku();
    const sudokuWithRemovedCells = removeCells(newSudoku, difficulty);
    setSudokuArr(sudokuWithRemovedCells);
    setInitialSudoku(sudokuWithRemovedCells);
    setGameStarted(true);
    setTime(0);
  }

  function onInputChange(e, row, column) {
    var value = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    if (
      value === -1 ||
      (value >= 1 && value <= 9 && checkValid(grid, row, column, value))
    ) {
      grid[row][column] = value;
    } else {
      toast.error('Incorrect value! Try again!!!');
    }

    setSudokuArr(grid);
    setGameStarted(true);
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(sudokuArr);
    const solvedSuccessfully = solver(sudoku);
    console.log("Solved Sudoku on Solve Button Click:", sudoku);
    console.log("Was Solver Successful on Solve Button Click:", solvedSuccessfully);
    setSudokuArr(sudoku);
  }

  function checkSudoku() {
    if (validateSudokuSolution(sudokuArr)) {
      toast.success('Congratulations! You have solved Sudoku correctly!');
      setGameStarted(false);
    } else {
      toast.error('Sudoku is not solved correctly. Keep trying!');
    }
  }

  function resetSudoku() {
    setSudokuArr(getDeepCopy(initialSudoku)); // Reset to the initial state
  }

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className={css.gameContainer} role="main" aria-labelledby="gameTitle">
      <div className={css.sudokuContainer} role="grid" aria-label="Sudoku Grid">
        <Table sudokuArr={sudokuArr} onInputChange={onInputChange} />
      </div>
      <div className={css.controlsContainer}>
        <h1 id="gameTitle">MY SUDOKU</h1>
        <p>Choose your game level:</p>
        <BtnCont switchDifficulty={setDifficulty} />
        <NewGameBtn newGame={newGame} />
        <Timer time={time} />
        <ControlBtnCont
          checkSudoku={checkSudoku}
          solveSudoku={solveSudoku}
          resetSudoku={resetSudoku}
        />
        <button onClick={handleBackToHome} className={css.backButton} aria-label="Back to Home">Back to Home</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Game;
