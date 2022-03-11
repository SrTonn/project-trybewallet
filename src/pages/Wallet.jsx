import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormExpensive from '../components/FormExpensive';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const { ask } = exchangeRates[currency];
      return acc + (+value * ask);
    }, 0);
    return (
      <>
        <header>
          <p data-testid="email-field">
            Email:&nbsp;
            <span>{email}</span>
          </p>
          <p>
            Despesa Total: R$&nbsp;
            <span data-testid="total-field">
              {(total || 0).toFixed(2)}
            </span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <FormExpensive />
        <Table />
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  ...wallet,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
