import React from 'react';
import PropTypes from 'prop-types';

const Score = props => <>Score : {props.scoreValue}</>;

Score.propTypes = {
  scoreValue: PropTypes.string.isRequired,
};

export default Score;
