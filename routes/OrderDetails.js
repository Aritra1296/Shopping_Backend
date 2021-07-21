const express = require('express')
const router = express.Router()
const OrderDetail = require('../models/OrderDetail')
//const auth = require('../middleware/auth')

//GET ALL THE ORDER
router.get('/', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.find()
    res.json(orderDetail)
  } catch (error) {
    res.json({ message: error })
  }
})

//GET ALL  THE ORDER OF A SPECIFIC USER
router.get('/orderHistory/:userId', async (req, res) => {
  try {
    const orderDetailHistory = await OrderDetail.find({
      userId: req.params.userId,
    })
    res.json(orderDetailHistory)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A ORDER
router.post('/submitNew', async (req, res) => {
  const orderDetail = new OrderDetail({
    productDetails: req.body.carts.map((cart) => {
      return {
        productName: cart.productName,
        productImage: cart.productImage,
        productPrice: cart.productPrice,
      }
    }),
    userId: req.body.user._id,
    userName: req.body.user.userName,
    email: req.body.user.email,
    phone: req.body.user.phone,
    addressLine: req.body.user.addressLine,
    landMark: req.body.user.landMark,
    zip: req.body.user.zip,
    city: req.body.user.city,
    state: req.body.user.state,
  })
  try {

    const savedOrderDetails = await orderDetail.save()
    res.json(savedOrderDetails)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router