import React from 'react';
import './style.scss';

const CustomInput = ({ type = 'text', disabled, onChange, value }) =>
  <input
    type={type}
    className={`custom-input${disabled ? ' disabled-input' : ''}`}
    onChange={onChange}
    value={value}
  />;

CustomInput.propTypes = {
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  value: React.PropTypes.node.isRequired,
};

export default CustomInput;
