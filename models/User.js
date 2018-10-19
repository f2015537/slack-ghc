const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nameSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  created: {
    type: Date,
    default: Date.now
  }
})
const User = mongoose.model('User', nameSchema)

module.exports = User
