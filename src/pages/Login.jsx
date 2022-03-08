import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import updateData, { USER_INFO } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isSubmitButtonDisabled: true,
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.checkAllConditions);
  }

  checkAllConditions = () => {
    const { email, password } = this.state;
    const regexCheckEmail = /^\w+@\w+\.\w{2,3}$/i;
    const MIN_CHARACTERES = 6;
    const conditions = [
      regexCheckEmail.test(email),
      password.length >= MIN_CHARACTERES,
    ];
    this.setState(() => ({
      isSubmitButtonDisabled: conditions.includes(false),
    }));
  }

  handleClick = () => {
    const { dispatch, history: { push } } = this.props;
    const { email } = this.state;

    dispatch(updateData(USER_INFO, email));
    push('/carteira');
  }

  render() {
    const { email, password, isSubmitButtonDisabled } = this.state;
    return (
      <form data-testid="page-login">
        <label htmlFor="email">
          Email:
          <input
            value={ email }
            onChange={ this.onInputChange }
            id="email"
            name="email"
            type="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            value={ password }
            onChange={ this.onInputChange }
            id="password"
            name="password"
            type="password"
            data-testid="password-input"
          />
        </label>
        <button
          onClick={ this.handleClick }
          disabled={ isSubmitButtonDisabled }
          type="button"
          data-testid="login-button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null)(Login);
