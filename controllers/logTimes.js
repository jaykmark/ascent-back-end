const db = require('../models');


// POST - Create Log Time
const create = async (req, res) => {
  try {
    const createdLogTime = await db.LogTime.create(req.body);
    // Find Skill by ID
    const foundSkill = await db.Skill.findById(createdLogTime.skill)
    foundSkill.logTimes.push(createdLogTime._id);
    foundSkill.totalMinutes += createdLogTime.minutes;
    await foundSkill.save()
    const updatedFoundSkill = await db.Skill.findById(createdLogTime.skill)
      .populate('logTimes')
      .populate({
        path: 'goals',
        model: 'Goal',
        populate: {
          path: 'skill',
          model: 'Skill',
          populate: {
            path: 'logTimes',
            model: 'LogTime',
          }
        }
      });
    res.status(200).json({
      status: 200,
      data: updatedFoundSkill,
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.',
    })
  }
};

// GET - Index of All Log Times
const index = async (req, res) => {
  try {
    const allLogTimes = await db.LogTime.find({});
    res.status(200).json({
      status: 200,
      count: allLogTimes.length,
      data: allLogTimes,
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.',
    })
  }
};

// GET - Show Log Time by ID
const show = async (req, res) => {
  try {
    const foundLogTime = await db.LogTime.findById(req.params.id);
    res.status(200).json({
      status: 200,
      data: foundLogTime,
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.'
    })
  }
};

// DELETE - Destroy Log Time by ID
const destroy = async (req, res) => {
  try {
    const destroyedLogTime = await db.LogTime.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Log Time destroyed.',
      data: destroyedLogTime,
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.'
    })
  }
};


module.exports = {
  create,
  index,
  show,
  destroy,
}