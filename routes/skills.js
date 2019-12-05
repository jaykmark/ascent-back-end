const router = require('express').Router();
const ctlr = require('../controllers');


// Create Skill
router.post('/', ctlr.skills.create);

// Index of All Skills
router.get('/', ctlr.skills.index);

// Read Skill by ID
router.get('/:id', ctlr.skills.show);

// Update Skill by ID
router.put('/:id', ctlr.skills.update);

// Destroy Skill by ID
router.delete('/:id', ctlr.skills.destroy);


module.exports = router;