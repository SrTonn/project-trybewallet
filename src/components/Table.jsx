import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateData, {
  IS_EDIT_MODE_ON,
  WALLET_EXPENSES_DELETE,
} from '../actions';
import Button from './Button';

class Table extends Component {
  handleClick = ({ target: { id, name } }) => {
    const { dispatch } = this.props;
    if (name === 'excluir') dispatch(updateData(WALLET_EXPENSES_DELETE, id));
    if (name === 'editar') {
      dispatch(updateData(IS_EDIT_MODE_ON, {
        id: +id,
        isEditModeOn: true,
      }));
    }
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
              <tr key={ id + description }>
                <td>{description || '...'}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(+value || 0).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.replace('/Real Brasileiro', '')}</td>
                <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <Button
                    label="Editar"
                    name="editar"
                    dataTestId="edit-btn"
                    handleClick={ this.handleClick }
                    id={ id }
                  />
                  <Button
                    label="Excluir"
                    name="excluir"
                    dataTestId="delete-btn"
                    handleClick={ this.handleClick }
                    id={ id }
                  />
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
  dispatch: PropTypes.func.isRequired,
};
