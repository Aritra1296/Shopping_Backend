const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

//GET DETAISL OF A SPECIFIC USER FROM DB BY USERID
router.get('/userDetails/:userId', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
})

//UPDATE USER DETAILS
router.patch(`/edit/:userId`, auth, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          email: req.body.email,
          userName: req.body.userName,
          phone: req.body.phone,
          gender: req.body.gender,
          addressLine: req.body.addressLine,
          landMark: req.body.landMark,
          zip: req.body.zip,
          city: req.body.city,
          state: req.body.state,
        },
      }
    )
    res.json(updatedUser)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A NEW USER
router.post('/', async (req, res) => {
  try {
    const { email, userName, password } = req.body

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
      passwordHash,
      userRole: 'User',
      phone: 'fill up details',
      gender: 'fill up details',
      addressLine: 'fill up details',
      landMark: 'fill up details',
      zip: 'fill up details',
      city: 'fill up details',
      state: 'fill up details',
    })
    const savedUser = await newUser.save()

    //CREATTING TOKEN
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    )
    console.log('user added')

    //SEND TOKEN TO HTTP-ONLY COOKIE
    res
      .cookie('token', token, {
        domain: process.env.COOKIE_DOMAIN,
        withCredentials: true,
        httpOnly: true,
      })
      .send()
  } catch (err) {
    res.json({ message: err })
  }
})

//LOG IN METHOD
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    //VALIDATION ALL FIELDS REQUIRED
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields' })

    //CHECK USER ID
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(401).json({ errorMessage: 'Wrong email or password' })

    //CHECK PASSWORD
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    )
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: 'Wrong email or password' })

    //SIGN TOKEN
    const token = jwt.sign(
      {
        user: existingUser._id,
        userRole: existingUser.userRole,
      },
      process.env.JWT_SECRET
    )

    //SEND TOKEN TO HTTP-ONLY COOKIE
    res
      .cookie('token', token, {
        domain: process.env.COOKIE_DOMAIN,
        withCredentials: true,
        httpOnly: true,
      })
      .json(existingUser)
      .send()
  } catch (error) {
    console.log(error)
  }
})

//CHECK LOGGED IN METHOD
router.get('/loggedIn', async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json(false)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.send({ loggedIn: true, ...payload })
  } catch (error) {
    console.log(error)
    res.json(false)
  }
})

//LOG OUT METHOD
router.get('/logout', async (req, res) => {
  res
    .cookie('token', '', {
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      expires: new Date(0),
    })
    .send()
})

module.exports = router
