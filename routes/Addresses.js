const express = require('express')
const router = express.Router()
const Address = require('../models/Address')

//GET ALL THE Address OF A SPECIFIC USER FROM DB
router.get('/', async (req, res) => {
  try {
    const address = await Address.find()
    res.json(address)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A Address
router.post('/submitNew', async (req, res) => {
  const address = new Address({
    userId: req.body.userId,
    addressLine: req.body.addressLine,
    landMark: req.body.landMark,
    zip: req.body.zip,
    district: req.body.district,
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