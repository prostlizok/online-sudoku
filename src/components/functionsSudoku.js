const GRID_SIZE = 9;
const BOX_SIZE = 3;

export function getDeepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function generateSudoku() {
  const sudoku = createEmptyGrid();
  resolveSudoku(sudoku);
  return sudoku;
}

export function createEmptyGrid() {
  return new Array(GRID_SIZE).fill().map(() => new Array(GRID_SIZE).fill(-1));
}

function resolveSudoku(grid) {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true;

  const numbers = getRandomNumbers();

  for (let i = 0; i < numbers.length; i++) {
    if (!validate(grid, emptyCell.row, emptyCell.column, numbers[i])) continue;

    grid[emptyCell.row][emptyCell.column] = numbers[i];

    if (resolveSudoku(grid)) return true;

    grid[emptyCell.row][emptyCell.column] = -1;
  }

  return false; // If no number fits, backtrack
}

function findEmptyCell(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      if (grid[row][column] === -1) return { row, column };
    }
  }
  return null;
}

function getRandomNumbers() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = numbers.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
  }
  return numbers;
}

function validate(grid, row, column, value) {
  return (
    validateColumn(grid, row, column, value) &&
    validateRow(grid, row, column, value) &&
    validateBox(grid, row, column, value)
  );
}

function validateColumn(grid, row, column, value) {
  for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
    if (grid[iRow][column] === value && iRow !== row) return false;
  }
  return true;
}

function validateRow(grid, row, column, value) {
  for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
    if (grid[row][iColumn] === value && iColumn !== column) return false;
  }
  return true;
}

function validateBox(grid, row, column, value) {
  const firstRowInBox = row - (row % BOX_SIZE);
  const firstColumnInBox = column - (column % BOX_SIZE);

  for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
    for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + BOX_SIZE; iColumn++) {
      if (grid[iRow][iColumn] === value && iRow !== row && iColumn !== column) return false;
    }
  }
  return true;
}

export function removeCells(grid, difficulty) {
  const resultGrid = [...grid].map(row => [...row]);

  let i = 0;
  while (i < difficulty) {
    let row = Math.floor(Math.random() * GRID_SIZE);
    let column = Math.floor(Math.random() * GRID_SIZE);
    if (resultGrid[row][column] !== -1) {
      resultGrid[row][column] = -1;
      i++;
    }
  }
  return resultGrid;
}

export function solver(grid, row = 0, column = 0) {
  if (row === GRID_SIZE) return true; 

  if (grid[row][column] !== -1) {
    const [nextRow, nextColumn] = getNext(row, column);
    return solver(grid, nextRow, nextColumn);
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValid(grid, row, column, num)) {
      grid[row][column] = num;
      if (solver(grid, ...getNext(row, column))) {
        return true;
      }
      grid[row][column] = -1; 
    }
  }

  return false; 
}

export function checkValid(grid, row, column, num) {
  return (
    checkRow(grid, row, num) &&
    checkColumn(grid, column, num) &&
    checkBox(grid, row, column, num)
  );
}

export function getNext(row, column) {
  if (column === GRID_SIZE - 1) {
    return [row + 1, 0];
  } else {
    return [row, column + 1];
  }
}

export function checkRow(grid, row, num) {
  return grid[row].indexOf(num) === -1;
}

export function checkColumn(grid, column, num) {
  return grid.map(row => row[column]).indexOf(num) === -1;
}

export function checkBox(grid, row, column, num) {
  let boxArr = [],
    rowStart = row - (row % 3),
    columnStart = column - (column % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxArr.push(grid[rowStart + i][columnStart + j]);
    }
  }
  return boxArr.indexOf(num) === -1;
}

export function validateSudokuSolution(grid) {
  // Check rows
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowSet = new Set();
    for (let col = 0; col < GRID_SIZE; col++) {
      const value = grid[row][col];
      if (value === -1 || rowSet.has(value)) {
        return false;
      }
      rowSet.add(value);
    }
  }

  // Check columns
  for (let col = 0; col < GRID_SIZE; col++) {
    const colSet = new Set();
    for (let row = 0; row < GRID_SIZE; row++) {
      const value = grid[row][col];
      if (value === -1 || colSet.has(value)) {
        return false;
      }
      colSet.add(value);
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < GRID_SIZE; boxRow += 3) {
    for (let boxCol = 0; boxCol < GRID_SIZE; boxCol += 3) {
      const boxSet = new Set();
      for (let row = 0; row < BOX_SIZE; row++) {
        for (let col = 0; col < BOX_SIZE; col++) {
          const value = grid[boxRow + row][boxCol + col];
          if (value === -1 || boxSet.has(value)) {
            return false;
          }
          boxSet.add(value);
        }
      }
    }
  }

  return true;
}
