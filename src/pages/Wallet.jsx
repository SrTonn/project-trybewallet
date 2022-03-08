import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormExpensive from '../components/FormExpensive';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">
            Email:&nbsp;
            <span>{email}</span>
          </p>
          <p>
            Despesa Total: R$&nbsp;
            <span data-testid="total-field">0.00</span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <FormExpensive />
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  ...user,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
