const db = require('../models');


// POST - Create Goal
const create = async (req, res) => {
  try {
    const createdGoal = await db.Goal.create(req.body)
    const foundCreatedGoal = await db.Goal.findById(createdGoal._id)
      .populate({
        path: 'skill',
        populate: {
          path: 'logTimes',
          model: 'LogTime',
        }
      })
      // .populate('logTimes')
      // .exec(async (err, foundGoal) => {
      //   if (err) return res.status(500).json(err);
        // createdGoal.populate({
        //   path:'skill',
        //   model: 'Skill'
        // });
        // Find Skill By ID and Save
        const foundSkill = await db.Skill.findById(req.body.skill);
        foundSkill.goals = createdGoal._id;
        await foundSkill.save();
        res.status(200).json({
          status: 200,
          data: foundCreatedGoal,
        })
      // });
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
    const updatedGoal = await db.Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    const updatedGoalFound = await db.Goal.findById(req.params.id)
    .populate({
      path: 'skill',
      model: 'Skill',
      populate: {
        path: 'logTimes',
        model: 'LogTime',
      }
    })
    console.log(updatedGoalFound)
    res.status(200).json({
      status: 200,
      data: updatedGoalFound,
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