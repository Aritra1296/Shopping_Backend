const express = require('express')
const router = express.Router()
const OrderDetail = require('../models/OrderDetail')

//GET ALL THE ORDER
router.get('/', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.find()
    res.json(orderDetail)
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
   // console.log(req.body);
   //console.log(orderDetail)
    const savedOrderDetails = await orderDetail.save()
    console.log("break")
    console.log(savedOrderDetails)
    res.json(savedOrderDetail)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router