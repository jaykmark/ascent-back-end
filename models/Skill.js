const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  totalMinutes: Number,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goals: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  },
  logTimes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LogTime',
  }]
});

module.exports = mongoose.model('Skill', skillSchema);