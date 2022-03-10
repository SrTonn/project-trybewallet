import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { id, type, name, label, handleClick, dataTestId } = this.props;
    return (
      <button
        id={ id }
        type={ type ? 'button' : 'button' }
        name={ name }
        onClick={ handleClick }
        data-testid={ dataTestId }
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
