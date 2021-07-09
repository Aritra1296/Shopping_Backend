const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
})

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
  productImage: [
    imageSchema,
  ],
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
