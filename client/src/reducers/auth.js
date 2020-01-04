import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const initialState = {
  // We can access localStorage via vanilla JS like so
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true, // Once loaded, through `loadUser` action, called from App.js (we need to do that each time App loads, as JWT is stateless): false
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      // We now need to pass down state. Note that `state` itself is immutable, so, whatever state is already there, we just want to copy -> spread operator `...state`, and then MODIFY what we want to modify
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
