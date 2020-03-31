import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux. The Provider is actually what connects react with redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  /* 
  The `useEffect` hook replaces 'componentDidMount' (a lifecycle method for classes) when we use functions instead of classes. 
  Here, we want (because JWT is stateless) to check for the token (by dispatching loadUser) each time the app loads.
  To note with useEffect: when the state updates, useEffect will keep running, and it will be a constant loop, unless we're going to add
  a second argument with some empty square brackets. We do that here because we only want useEffect to run once - when it's mounted. 
  If you put properties in the brackets, useEffect will run each time these properties update. If brackets are empty, it runs only once.
  */
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    // Next line is to connect the redux store
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
