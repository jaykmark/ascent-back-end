const router = require('express').Router();
const ctlr = require('../controllers');


// Show Index of All Users
router.get('/', ctlr.users.index);

// Show One User by ID
router.get('/:id', ctlr.users.show);


module.exports = router;