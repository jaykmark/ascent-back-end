const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MONGEEEEEESE ASSSEEEEEEMMMBLEE'))
  .catch((err) => console.log(err));

module.exports = {
  User: require('./User'),
  Skill: require('./Skill'),
  Goal: require('./Goal'),
  LogTime: require('./LogTime'),
};