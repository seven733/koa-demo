const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: String,
  content: String,
  finished: { type: Boolean, default: false }
});

module.exports = {
  Todo: mongoose.model('todo', TodoSchema)
};
