const userSchema = require('mongoose').Schema({
  username: {
    type: String,
    required: [true, 'Username is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  email: String,
  name: String,
});

module.exports = mongoose.model('User', userSchema);