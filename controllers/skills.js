const db = require('../models');


// POST - Create Skill
const create = async (req, res) => {
  try {
    const createdSkill = await db.Skill.create(req.body);
    // Find User by ID
    const foundUser = await db.User.findById(req.body.user);
    // Push ID of created skill into User's 'skills.'
    foundUser.skills.push(createdSkill._id)
    await foundUser.save()
    res.status(200).json({
      status: 200,
      data: createdSkill,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// GET - Index of All Skills
const index = async (req, res) => {
  try {
    const allSkills = await db.Skill.find({});
    res.status(200).json({
      status: 200,
      count: allSkills.length,
      data: allSkills,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// GET - Show Skill by ID
const show = async (req, res) => {
  try {
    const foundSkill = await db.Skill.findById(req.params.id).populate('logTimes goals');
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
    const updatedSkill = await db.Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('logTimes');
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
      message: 'Skill destroyed.',
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
  index,
  show,
  update,
  destroy,
};