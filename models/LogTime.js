const mongoose = require('mongoose');

const logTimeSchema = mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: [true, 'Skill required to log time.'],
  },
  minutes: {
    type: Number,
    required: [true, 'Number of minutes required.'],
  },
  date: {
    type: Date,
    required: [true, 'Date required.'],
    default: Date.now,
  }
});

module.exports = mongoose.model('LogTime', logTimeSchema);