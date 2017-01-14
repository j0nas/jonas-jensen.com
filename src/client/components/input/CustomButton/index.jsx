import React from 'react';
import './style.scss';

const CustomButton = ({ text, onClick, disabled }) =>
  <button className={`custom-button${disabled ? ' disabled-button' : ''}`} onClick={onClick} disabled={disabled}>
    {text}
  </button>;

CustomButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
};

export default CustomButton;
