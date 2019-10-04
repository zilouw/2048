import React from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

const Cell = props => (
  <td className={`number number-${props.value}`}>{props.value}</td>
);

Cell.propTypes = {
  value: PropTypes.string.isRequired,
};
export default Cell;
