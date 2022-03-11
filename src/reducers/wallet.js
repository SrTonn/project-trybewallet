import {
  IS_EDIT_MODE_ON,
  WALLET_CURRENCIES,
  WALLET_EXPENSES,
  WALLET_EXPENSES_DELETE,
  WALLET_EXPENSES_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editRow: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === WALLET_CURRENCIES) {
    return {
      ...state,
      currencies: action.payload,
    };
  }

  if (action.type === WALLET_EXPENSES) {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }

  if (action.type === WALLET_EXPENSES_DELETE) {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== +action.payload),
    };
  }

  if (action.type === WALLET_EXPENSES_EDIT) {
    const { exchangeRates } = state.expenses.find(({ id }) => id === +action.payload.id);
    const editedObj = {
      ...action.payload,
      exchangeRates,
    };

    return {
      ...state,
      expenses: [
        ...state.expenses.filter(({ id }) => id !== +action.payload.id),
        editedObj,
      ].sort((a, b) => a.id - b.id),
    };
  }

  if (action.type === IS_EDIT_MODE_ON) {
    return {
      ...state,
      editRow: action.payload,
    };
  }
  return state;
};

export default wallet;
