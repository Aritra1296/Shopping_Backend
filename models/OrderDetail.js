const mongoose = require('mongoose')

const productDetailsSchema = mongoose.Schema({
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
  }
})


const orderDetailSchema = mongoose.Schema({
  productDetails: [productDetailsSchema],
  email: {
    type: String,
    required: true,
  },
  userId: {
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
