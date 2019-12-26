import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

/*
We want to be able to dispatch more than one action type from the funtion below -> we can do so by using the thunk middleware, 
which allows us to state `=> dispatch => {}`
*/
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
