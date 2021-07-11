const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true
}
});

const cartSchema = mongoose.Schema({
  userId: {
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
  productImage: [imageSchema],
  
  productCount: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Cart', cartSchema)
