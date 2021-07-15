const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productCategory: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: [String],
    required: true
  }
  ,
  productPrice: {
    type: String,
    required: true,
  },
  productStatus: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', productSchema)
