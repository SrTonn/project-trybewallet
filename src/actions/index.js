export const USER_INFO = 'USER_INFO';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const WALLET_EXPENSES = 'WALLET_EXPENSES';

const updateData = (type, state) => ({
  type,
  payload: state,
});

export default updateData;
