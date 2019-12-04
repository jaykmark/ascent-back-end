const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required.']
  },
  description: String,
  totalMinutes: Number,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User for skill is required.']
  },
});

module.exports = mongoose.model('Skill', skillSchema);