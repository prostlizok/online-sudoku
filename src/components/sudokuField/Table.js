import React from 'react';
import css from './Table.module.css';

const Table = ({ sudokuArr, onInputChange }) => {
  return (
    <table>
      <tbody>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
          return (
            <tr key={rIndex} className={(row + 1) % 3 === 0 ? css.bBorder : ''}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((column, cIndex) => {
                return (
                  <td
                    key={rIndex + cIndex}
                    className={(column + 1) % 3 === 0 ? css.rBorder : ''}
                  >
                    <input
                      onChange={e => {
                        onInputChange(e, row, column);
                      }}
                      className={css.cellInput}
                      value={
                        sudokuArr[row][column] === -1
                          ? ''
                          : sudokuArr[row][column]
                      }
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
