const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//SUBMIT A NEW USER
router.post('/', async (req, res) => {
  try {
    const { email, userName, userRole,password ,phone,gender} = req.body

    //VALIDATION ALL  FIELDS REQUIRED
    if (!userName || !email || !password)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields ' })
    //VALIDATION SAME USER
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ errorMessage: 'An user already present' })

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //SAVE USESR
    const newUser = new User({
      email,
      userName,
      userRole,
      passwordHash,
      phone,
      gender
    })
    const savedUser = await newUser.save()

    //CREATTING TOKEN
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    )
    console.log('token', token)

    //SEND TOKEN TO HTTP-ONLY COOKIE
    res
      .cookie('token', token, {
        domain : process.env.COOKIE_DOMAIN,
        httpOnly: true,
      })
      .send()
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router