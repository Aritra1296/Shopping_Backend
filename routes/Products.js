const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
// const auth = require('../middleware/auth')

//GET ALL THE PRODUCTS OF A SPECIFIC USER FROM DB
router.get('/', async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT A PRODUCT
router.post('/submitNew', async (req, res) => {
  const product = new Product({
    productCategory: req.body.productCategory,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    productPrice: req.body.productPrice,
    productStatus: req.body.productStatus,
    productMaxQuantiy: req.body.productMaxQuantiy,
  })
  try {
    const savedProduct = await product.save()
    res.json(savedProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

//GET THE SPECIFIC PRODUCT FROM DB FOR VIEW DETAILS
router.get('/view/:productID', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productID)
    res.json(product)
  } catch (error) {
    res.json({ message: error })
  }
})

//UPDATE A PRODUCT
router.patch('/:productID', async (req, res) => {
  try {
    const updatedProduct = await Post.Product(
      { _id: req.params.productID },
      {
        $set: {
          productCategory: req.body.productCategory,
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productImage: req.body.productImage,
          productPrice: req.body.productPrice,
          productStatus: req.body.productStatus,
          productMaxQuantiy: req.body.productMaxQuantiy,
        },
      }
    )
    res.json(updatedProduct)
  } catch (error) {
    res.json({ message: error })
  }
})

//DELETE A PRODUCT
router.delete('/:productID', async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productID })
    res.json(removedProduct)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
