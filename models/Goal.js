const goalSchema = require('mongoose').Schema({
  skill: {
    type: Schema.Types.ObjectId,
    ref: 'Skill',
    required: [true, 'Skill for goal is required,.'],
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  duration: Number,
  frequency: String,
  dueDate: Date,
  reminder: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Goal', goalSchema);