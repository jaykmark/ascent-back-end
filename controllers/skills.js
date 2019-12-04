const db = require('../models');


// POST - Create Skill
const create = (req, res) => {
  db.Skill.create(req.body, (err, createdSkill) => {
    if (err) return console.log(err);

    res.json({
      status: 201,
      data: createdSkill,
      dateRequested: new Date().toLocaleString()
    })
  })
};

// GET - Show Skill by ID
const show = async (req, res) => {
  try {
    const foundSkill = await db.Skill.findById(req.params.id);
    res.status(200).json({ 
      status: 200,
      data: foundSkill,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};


module.exports = {
  create,
  show,
};