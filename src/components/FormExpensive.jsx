import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAwesomeApi from '../services/api';
import updateData, {
  IS_EDIT_MODE_ON,
  WALLET_CURRENCIES,
  WALLET_EXPENSES,
  WALLET_EXPENSES_EDIT,
} from '../actions';

class FormExpenses extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    currencyTypes: [],
    method: 'Pix',
    tag: 'Alimentação',
  };

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const currencyTypes = await fetchAwesomeApi({ coins: true });

    this.setState({ currencyTypes });
    dispatch(updateData(WALLET_CURRENCIES, currencyTypes));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch, editRow } = this.props;
    const exchangeRates = await fetchAwesomeApi();
    const expensesObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    if (editRow?.isEditModeOn) {
      expensesObj.id = editRow.id;
      dispatch(updateData(WALLET_EXPENSES_EDIT, expensesObj));
      dispatch(updateData(IS_EDIT_MODE_ON, {
        isEditModeOn: false,
      }));
      return;
    }

    dispatch(updateData(WALLET_EXPENSES, expensesObj));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  }

  render() {
    const {
      value,
      description,
      currency,
      currencyTypes: coins,
      method,
      tag,
    } = this.state;
    const { editRow } = this.props;
    return (
      <nav>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            name="value"
            type="number"
            value={ value }
            required
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição da despesas:
          <input
            id="description"
            name="description"
            type="text"
            value={ description }
            required
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            value={ currency }
            required
            onChange={ this.handleChange }
            data-testid="currency-input"
            type="select-multiple"
          >
            { coins.map((coin) => (
              <option
                key={ coin }
                value={ coin }
                data-testid={ coin }
              >
                { coin }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Pagamento:
          <select
            id="method"
            name="method"
            value={ method }
            required
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            name="tag"
            value={ tag }
            required
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
          data-testid={ editRow?.isEditModeOn ? 'edit-btn' : null }
        >
          {editRow?.isEditModeOn ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </nav>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(FormExpenses);

FormExpenses.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editRow: PropTypes.shape(PropTypes.object).isRequired,
};

// Ref.: https://github.com/tryber/sd-018-b-project-trybewallet/blob/c2315ed03f5c3c021c1875fe6fb592985ef02cc9/src/components/FormExpenses.jsx
