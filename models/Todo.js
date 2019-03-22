const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  content: {
    type: String,
    isRequired: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema);