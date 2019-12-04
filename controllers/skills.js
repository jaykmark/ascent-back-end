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

// PUT - Update Skill by ID
const update = async (req, res) => {
  try {
    const updatedSkill = await db.Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      status: 200,
      data: updatedSkill,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// DELETE - Destroy Skill by ID
const destroy = async (req, res) => {
  try {
    const destroyedSkill = await db.Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Skill deleted.',
      data: destroyedSkill,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
}


module.exports = {
  create,
  show,
  update,
  destroy,
};