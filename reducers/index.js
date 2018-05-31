import { ADD_ENTRY, RECEIVE_ENTRIES } from '../actions';

function entries(state = {}, action) {
  if (action.type === RECEIVE_ENTRIES) {
    return {
      ...state,
      ...action.entries
    };
  }

  if (action.type === ADD_ENTRY) {
    return {
      ...state,
      ...action.entry
    };
  }

  return state;
}

export default entries;
