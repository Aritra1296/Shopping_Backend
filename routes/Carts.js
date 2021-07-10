const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart');
const auth = require('../middleware/auth')

//GET ALL THE CARTS
router.get('/', auth,async (req, res) => {
  try {
    const cart = await Cart.find()
    res.json(cart)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A CART
router.post('/submitNew', auth, async (req, res) => {
  const cart = new Cart({
    userId: req.body.userId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImage: [
      { image: req.body.productImage[0].image },
      { image: req.body.productImage[1].image },
      { image: req.body.productImage[2].image },
    ],
    productPrice: req.body.productPrice,
    productCount: req.body.productCount,
    total: req.body.total,
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
    const removedCart = await Cart.remove({ _id: req.params.cartID })
    res.json(removedCart)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
