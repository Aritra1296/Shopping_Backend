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
    productName: req.body.productName,
    productImage: req.body.productImage,
    productPrice: req.body.productPrice,
    userName: req.body.userName,
    email: req.body.email,
    phone: req.body.phone,
    addressLine: req.body.addressLine,
    landMark: req.body.landMark,
    zip: req.body.zip,
    city: req.body.city,
    state: req.body.state,
  })
  try {
    console.log(req.body);
    
    const savedOrderDetail = await orderDetail.save()
    res.json(savedOrderDetail)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router