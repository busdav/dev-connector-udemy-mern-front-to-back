import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* 
We've destructured `(props)` to `({ alerts })`, so that we don't need to use `props.alerts` but can just say `alerts`
Also, we're only using one expression -> no need for curly braces
*/
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  // We want to return some jsx for each alert. Also, you need a unique key whenever you generate jsx for each item of a list
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert); // So here we only pass in state, not any action (unlike Register component)
