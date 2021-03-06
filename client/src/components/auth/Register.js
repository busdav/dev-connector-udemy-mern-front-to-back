import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// We could destructure `(props)` to `({ setAlert, register })`, so that we don't need to use `props.setAlert` but can just say `setAlert`
const Register = props => {
  const [formData, setFormData] = useState({
    // using the useState hook (replacing classes); first element is the state object
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // ... spread operator basically copies all properties of formData state object, and then we change the respective 'name' property (applicable to dfferent properties since abstracted as [e.target.name])

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert('Passwords do not match', 'danger');
    } else {
      props.register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            // required // You can combine these HTML5 validations with the validations coming from the backend and being displayed by React
          />
          {/* could also call setState directly, but we want to reuse for different situations. Btw for jsx comments we need the curly braces. */}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            // minLength='6'
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            // minLength='6'
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired, // just type ptfr for snippet
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/* `connect` connects the react component to redux. It takes in two arguments:
the first one is any state you want to map (e.g. if you want to get state from another component - or null if there's nothing we want to use).
The second one is an object with any actions you want to use, as defined in the PropTypes of the component. 
Following definition in propTypes and passing to `connect`, these actions are now props of the component and connected to redux, 
and we can access and call them e.g. like so: props.setAlert('Passwords do not match', 'danger') (where first argument is msg, second is alertType)
*/
export default connect(mapStateToProps, { setAlert, register })(Register);
