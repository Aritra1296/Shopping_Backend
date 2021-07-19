const mongoose = require('mongoose')

const orderDetailSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: [String],
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phone: {
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
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  Orderdate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('OrderDetail', orderDetailSchema)
