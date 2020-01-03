import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // We now need to pass down state. Note that `state` itself is immutable, so, whatever state is already there, we just want to copy -> spread operator `...state`, and then ADD the action.payload (i.e. our new alert) to it
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); // `payload` in this case is only the id (we can define each time what is the payload)
    default:
      return state;
  }
}
