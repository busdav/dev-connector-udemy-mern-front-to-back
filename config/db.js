const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // Bad practice to use config for API keys, secrets etc. Done here for simplicity.

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/testing', {
      // switch back to `db`
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
