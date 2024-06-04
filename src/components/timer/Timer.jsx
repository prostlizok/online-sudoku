import React from 'react';
import css from './Timer.module.css';

const Timer = ({ time }) => {
  return (
    <div className={css.timer}>
      Time: {new Date(time * 1000).toISOString().substr(11, 8)}
    </div>
  );
};
export default Timer;
