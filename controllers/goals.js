const db = require('../models');


// POST - Create Goal
const create = async (req, res) => {
  try {
    const createdGoal = await db.Goal.create(req.body).populate('skill');
    // Find Skill By ID and Save
    const foundSkill = await db.Skill.findById(req.body.skill);
    foundSkill.goals = createdGoal._id;
    foundSkill.save();
    res.status(200).populate('skill').json({
      status: 200,
      data: createdGoal,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// GET - Index of All Goals
const index = async (req, res) => {
  try {
    const allGoals = await db.Goal.find({});
    res.status(200).json({
      status: 200,
      count: allGoals.length,
      data: allGoals,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// GET - Show Goal by ID
const show = async (req, res) => {
  try {
    const foundGoal = await db.Goal.findById(req.params.id).populate('skill');
    res.status(200).json({ 
      status: 200,
      data: foundGoal,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// PUT - Update Goal by ID
const update = async (req, res) => {
  try {
    const updatedGoal = await db.Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('skill');
    res.status(200).json({
      status: 200,
      data: updatedGoal,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};

// DELETE - Destroy Goal by ID
const destroy = async (req, res) => {
  try {
    const destroyedGoal = await db.Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Goal destroyed.',
      data: destroyedGoal,
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