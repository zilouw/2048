import React from 'react';
import Cell from './Cell.js';
import PropTypes from 'prop-types';
const Board = props => {
  if (props.values != null)
    return (
      <table>
        <tbody>
          {props.values.map((columns, key) => (
            <Row values={columns} key={key} />
          ))}
        </tbody>
      </table>
    );
  else return <table />;
};

const Row = props => (
  <tr>
    {props.values.map((cellValue, key) => (
      <Cell value={cellValue} key={key} />
    ))}
  </tr>
);

Board.propTypes = {
  values: PropTypes.array.isRequired,
};

Row.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Board;
