import { WALLET_DATA } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === WALLET_DATA) {
    // todo: corrigir essa lógica quando souber como será feito o dispatch
    return {
      currencies: action.payload,
      expenses: action.payload,
    };
  }
  return state;
};

export default wallet;
