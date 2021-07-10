const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  landMark: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Address', addressSchema)
