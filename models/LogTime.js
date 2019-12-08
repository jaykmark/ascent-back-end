const mongoose = require('mongoose');


const logTimeSchema = mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
// check dates and compare to current date
  // Array find to see where date == date, if found don't show it
module.exports = mongoose.model('LogTime', logTimeSchema);