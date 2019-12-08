const router = require('express').Router();
const ctlr = require('../controllers');
const authRequired = require('../middleware/authRequired')


// // Show Index of All Users
// router.get('/', ctlr.users.index);

// Show One User by ID
router.get('/', authRequired, ctlr.users.show);

// Update User by ID
router.put('/:id', ctlr.users.update);


module.exports = router;