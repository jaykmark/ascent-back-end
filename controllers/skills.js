const db = require('../models');

// Create skill
const create = (req, res) => {
  db.Skill.create(req.body, (err, createdSkill) => {
    if (err) return console.log(err);

    res.json({
      status: 201,
      count: 1,
      data: createdSkill,
      dateRequested: new Date().toLocaleString()
    })
  })
};

module.exports = {
  create,
};