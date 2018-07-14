const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'read' }
});

module.exports = {
  User: mongoose.model('user', RoleSchema)
};
