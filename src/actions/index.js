export const USER_INFO = 'USER_INFO';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const WALLET_EXPENSIES = 'WALLET_EXPENSIES';

const updateData = (type, state) => ({
  type,
  payload: state,
});

export default updateData;
