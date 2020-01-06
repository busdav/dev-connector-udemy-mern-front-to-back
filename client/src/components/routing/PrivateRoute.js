import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Again we destructure twice here: `Component` out of `component`, and then all the rest that's passed in through custom props (with the `...rest` spread operator)
const PrivateRoute = (
  { component: Component, auth: { isAuthenticated, loading }, ...rest } // We're not going to return anything, just set up a route, so parenthesis after arrow is enough
) => (
  /* 
  We want to pass along any custom props that are being passed in, through `...rest`. 
  Then, we're putting a `render`, which is also a prop, where we test whether user isAuthenticated or loading; if not either, we redirect, 
  otherwise we render the relevant Component, passing along the props.
  */
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
