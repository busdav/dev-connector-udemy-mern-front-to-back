import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    /* 
    If there's a token in localStorage, we're going to set a global header - that way, we're just sending it with every request,
    instead of picking and choosing which request to send it with
    */
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
