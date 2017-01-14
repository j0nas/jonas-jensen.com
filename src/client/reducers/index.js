import { handle } from 'redux-pack';
import { REQUEST_RESPONSE_FROM_API, CHANGE_INPUT_VALUE } from '../types';

const initialState = {
  inputValue: 0,
  isLoading: false,
  error: null,
  response: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_RESPONSE_FROM_API:
      return handle(state, action, {
        start: s => ({ ...s, isLoading: true, error: null, response: null }),
        finish: s => ({ ...s, isLoading: false }),
        failure: s => ({ ...s, error: payload }),
        success: s => ({ ...s, response: payload }),
      });

    case CHANGE_INPUT_VALUE:
      return Object.assign({}, state, { inputValue: action.inputValue });

    default:
      return state;
  }
};
