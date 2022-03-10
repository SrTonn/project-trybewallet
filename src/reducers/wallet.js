import { WALLET_CURRENCIES, WALLET_EXPENSES, WALLET_EXPENSES_DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === WALLET_CURRENCIES) {
    return {
      currencies: action.payload,
      expenses: state.expenses,
    };
  }

  if (action.type === WALLET_EXPENSES) {
    return {
      currencies: state.currencies,
      expenses: [...state.expenses, action.payload],
    };
  }

  if (action.type === WALLET_EXPENSES_DELETE) {
    return {
      currencies: state.currencies,
      expenses: state.expenses.filter(({ id }) => id !== +action.payload),
    };
  }

  return state;
};

export default wallet;
