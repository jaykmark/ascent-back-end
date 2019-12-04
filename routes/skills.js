const router = require('express').Router();
const ctlr = require('../controllers');


// Create Skill
router.post('/', ctlr.skills.create);

// Read Skill
router.get('/:id', ctlr.skills.show)

// Update Skill

// Destroy Skill



module.exports = router;