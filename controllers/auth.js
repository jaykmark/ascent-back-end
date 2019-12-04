const db = require('../models');
const bcrypt = require('bcryptjs');
const validate = require('../validation/register');
const jwt = require('jsonwebtoken');


// // 500 Error
// const err500 = () => {
//   res.status(500).json({
//     status: 500,
//     error: [{ message: 'Something went wrong, please try again' }],
//   })
// };

// // Create User on Sign Up
// const createUser = (req, res) => {
//   db.User.findOne({ username: req.body.username }, (err, foundUser) => {
//     if (err) return err500(res);

//     if (foundUser) return res.status(400).json({
//       status: 400,
//       error: [{ message: 'Invalid request. Please try again.' }],
//     });

//     // Create Salt Rounds
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) return err500(res);

//       bcrypt.hash(req.body.password, salt, (err, hash) => {
//         if (err) return err500();

//         const newUser = {
//           username: req.body.username,
//           password: hash,
//         };

//         db.User.create(newUser, (err, createdUser) => {
//           res.status(201).json({
//             status: 201,
//           })
//         })
//       })
//     })
//   })
// };

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



module.exports = {
  register,
  // login,
}