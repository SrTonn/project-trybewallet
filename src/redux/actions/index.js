export const USER_INFO = 'USER_INFO';
export const WALLET_DATA = 'WALLET_DATA';

const updateData = (type, state) => ({
  type,
  payload: { ...state },
});

export default updateData;
