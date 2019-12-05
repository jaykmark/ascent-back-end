const router = require('express').Router();
const ctlr = require('../controllers');


// Create Log Time
router.post('/', ctlr.logTimes.create);

// Index of All Log Times
router.get('/', ctlr.logTimes.index);

// Show Log Time by ID
router.get('/:id', ctlr.logTimes.show);

// Destroy Log Time by ID
router.delete('/:id', ctlr.logTimes.destroy);


module.exports = router;