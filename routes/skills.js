const express = require('express');const router = express.Router();
const ctlr = require('../controllers');

// Create Skill
router.post('/', ctlr.skills.create);

// Read Skill

// Update Skill

// Destroy Skill


module.exports = router;