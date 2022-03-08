import { WALLET_CURRENCIES, WALLET_EXPENSIES } from '../actions';

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

  if (action.type === WALLET_EXPENSIES) {
    return {
      currencies: state.currencies,
      expenses: [...state.expenses, action.payload],
    };
  }

  return state;
};

export default wallet;
