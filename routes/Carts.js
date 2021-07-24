const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const auth = require('../middleware/auth')

//GET ALL THE CARTS
router.get('/:userId', auth, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId })
    res.json(cart)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A CART
router.post('/submitNew', auth, async (req, res) => {
  const cart = new Cart({
    userId: req.body.loginUserID,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    productPrice: req.body.productPrice,
  })
  try {
    const savedCart = await cart.save()
    res.json(savedCart)
  } catch (err) {
    res.json({ message: err })
  }
})

//DELETE A CART
router.delete('/:cartID', auth, async (req, res) => {
  try {
    const removedCart = await Cart.findOneAndDelete({ _id: req.params.cartID })
    res.json(removedCart)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
