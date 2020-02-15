import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  /* 
  `text` will be one string only because we're only going to use one field for this form, so, no need for a formData object.
  However, see below in the `onSubmit`: we then pass the text on to the redux action AS AN OBJECT (in the action, this will be the `formData`).
  */
  const [text, setText] = useState('');
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
