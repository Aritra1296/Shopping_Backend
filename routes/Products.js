const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const path = require('path')
const multer = require('multer')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'ProductImages')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })

//GET ALL THE PRODUCTS OF A SPECIFIC USER FROM DB
router.get('/',auth, async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A PRODUCT
router.post(
  '/submitNew',
  auth,
  upload.array('productImage', 10),
  async (req, res) => {
    const product = new Product({
      productCategory: req.body.productCategory,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productStatus: req.body.productStatus,
      productMaxQuantiy: req.body.productMaxQuantiy,
      productImage: req.files.map((file) => {
        return file.path
      }),
    })

    try {
      const savedProduct = await product.save()
      res.json(savedProduct)
    } catch (err) {
      res.json({ message: err })
    }
  }
)

//GET THE SPECIFIC PRODUCT FROM DB FOR VIEW DETAILS
router.get('/view/:productID', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productID)
    res.json(product)
  } catch (error) {
    res.json({ message: error })
  }
})

//DELETE A PRODUCT
router.delete('/:productID', auth, async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({
      _id: req.params.productID,
    })
    res.json(removedProduct)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
