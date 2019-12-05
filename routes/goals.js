const router = require('express').Router();
const ctlr = require('../controllers');


// Create Goal
router.post('/', ctlr.goals.create);

// Index of All Goals
router.get('/', ctlr.goals.index);

// Read Goal by ID
router.get('/:id', ctlr.goals.show);

// Update Goal by ID
router.put('/:id', ctlr.goals.update);

// Destroy Goal by ID
router.delete('/:id', ctlr.goals.destroy);


module.exports = router;