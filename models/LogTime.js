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
''
module.exports = mongoose.model('LogTime', logTimeSchema);