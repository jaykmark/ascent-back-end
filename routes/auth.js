const router = require('express').Router();
const ctlr = require('../controllers');

// Sign Up to Create User
router.post('/register', ctlr.auth.register);

module.exports = router;