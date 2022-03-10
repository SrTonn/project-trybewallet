import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            ({ id, currency, description, tag, method, value, exchangeRates }) => (
              <tr key={ id }>
                <td>{description || '...'}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(+value || 0).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            ),
          )}

        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
