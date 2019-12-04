const db = require('../models');
const bcrypt = require('bcryptjs');
const validate = require('../validation/register');
const jwt = require('jsonwebtoken');


// POST Register Route
const register = (req, res) => {
  // Deconstructs errors from validate function, which is being imported from ../validations/register
  const { errors, notValid } = validate(req.body);
  // Send error messages if req.body is not valid
  if (notValid) {
    return res.status(400).json({ status: 400, errors })
  }
  // Verify email is not already used in another account
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong. Please try again.'
      })
    }
    if (foundUser) {
      return res.status(400).json({
        status: 400,
        message: 'Email address has already registered. Please try again.'
      });
    }
    // Generate Salt for Password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong. Please try again.'
        })
      }
      // Hash User Password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.'
          })
        }
        // Replace password in req.body with hashed password
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
        };
        // Create User in database
        db.User.create(newUser, (err, createdUser) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              message: 'Something went wrong. Please try again.'
            })
          }
          res.status(201).json({
            status: 201,
            message: 'User created successfully.'
          })
        });
      });
    });
  });
};

// POST Login Route
const login = (req, res) => {
  // Validate that req.body contains username and password
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: 'Please enter your username and password.'
    })
  }
  // Find User's account with username as the parameter
  db.User.findOne({ username: req.body.username })
  // Pull password back in
    .select('+password')
    .exec((err, foundUser) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong. Please try again.'
        })
      }
      // Error if User can't be found in database using email
      if (!foundUser) {
        return res.status(400).json({
          status: 400,
          message: 'Username or password is incorrect.'
        })
      }
      // Compare req.body.password and database password with bcrypt
      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.',
            err,
          })
        }
        // Create JSON Web Token if passwords match.
        if (isMatch) {
          const payload = {
            _id: foundUser._id
          }
          // Sign JWT with User ID, session secret, setting it to last 1 hour.
          jwt.sign(payload, process.env.SESSION_SECRET, {
            expiresIn: '1h' }, (err, signedJwt) => {
              return res.status(200).json({
                status: 200,
                message: 'Login successful.',
                signedJwt,
              })
            })
        } else {
          return res.status(400).json({
            status: 400,
            message: 'Username or password is incorrect.'
          })
        }
      })
    });
};


module.exports = {
  register,
  login,
};