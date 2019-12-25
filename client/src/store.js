import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// since we're defining the rootReducer in a file called 'index.js', stating the directory is enough
import rootReducer from './reducers';

// empty object because all of our initial state will be in the reducers
const initialState = {};

const middleware = [thunk];

// third argument of createStore is any middleware - since we're using composeWithDevTools from redux-devtools-extension, we're going to wrap it in that
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
