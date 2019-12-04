const router = require('express').Router();
const ctlr = require('../controllers');


// Register to Create User
router.post('/register', ctlr.auth.register);

// Login to Create Session with JSON Web Token
router.post('/login', ctlr.auth.login);


module.exports = router;