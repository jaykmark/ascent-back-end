const router = require('express').Router();
const ctlr = require('../controllers');


// Create Skill
router.post('/', ctlr.skills.create);

// Read Skill
router.get('/:id', ctlr.skills.show);

// Update Skill
router.put('/:id', ctlr.skills.update);

// Destroy Skill



module.exports = router;