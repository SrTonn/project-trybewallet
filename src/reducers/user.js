import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  email: 'aaa@bbws.com',
};

const user = (state = INITIAL_STATE, action) => {
  if (action.type === USER_INFO) {
    return {
      email: action.payload,
    };
  }
  return state;
};

export default user;
