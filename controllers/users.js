const db = require('../models');


// GET - Index of All Users
const index = (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      message: 'All Users',
      count: allUsers.length,
      data: allUsers,
    })
  });
};

// GET - Show One User by ID
const show = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.userId).populate({
      path:'skills',
      populate: {
        path: 'goals',
        model: 'Goal',
        populate: {
          path: 'skill',
          model: 'Skill',
        }
      }
    });
    res.status(200).json({
      status: 200,
      data: foundUser
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.'
    })
  }
};

// PUT - Update User by ID
const update = async (req, res) => {
  try {
    const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      status: 200,
      data: updatedUser,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
};


module.exports = {
  index,
  show,
  update,
};