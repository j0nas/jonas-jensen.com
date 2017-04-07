import { UPDATE_FIELD } from '../types/calcTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return { ...state, [action.name]: action.value };

    default:
      return state;
  }
};
