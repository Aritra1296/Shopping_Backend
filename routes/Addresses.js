const express = require('express')
const router = express.Router()
const Address = require('../models/Address');
const auth = require('../middleware/auth')

//GET ALL THE ADDRESSES OF A SPECIFIC USER FROM DB
router.get('/:userId',  async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.params.userId })
    res.json(address)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A ADDRESS
router.post('/submitNew', async (req, res) => {
  const address = new Address({
    userId: req.body.userId,
    addressLine: req.body.addressLine,
    landMark: req.body.landMark,
    zip: req.body.zip,
    city: req.body.city,
    state: req.body.state,
  })
  try {
    const savedAddress = await address.save()
    res.json(savedAddress)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router