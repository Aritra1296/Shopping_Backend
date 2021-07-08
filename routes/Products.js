const express = require('express')
const router = express.Router()
const Product = require('../models/Product')


//GET ALL THE POSTS OF A SPECIFIC USER FROM DB
router.get('/', async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (error) {
    res.json({ message: error })
  }
})

//GET THE SPECIFIC POST FROM DB FOR EDITING
// router.get('/edit/:postID', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.postID)
//     res.json(post)
//   } catch (error) {
//     res.json({ message: error })
//   }
// })

//SUBMIT POST
router.post('/submitNew', async (req, res) => {
  const product = new Product({
    productCategory: req.body.productCategory,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    productPrice: req.body.productPrice,
    productStatus: req.body.productStatus,
  })
  try {
    const savedProduct = await product.save()
    res.json(savedProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

//UPDATE A POST
// router.patch('/:postID', auth, async (req, res) => {
//   try {
//     const updatedPost = await Post.findOneAndUpdate(
//       { _id: req.params.postID },
//       {
//         $set: {
//           name: req.body.name,
//           phone: req.body.phone,
//           email: req.body.email,
//           address: req.body.address,
//         },
//       }
//     )
//     res.json(updatedPost)
//   } catch (error) {
//     res.json({ message: error })
//   }
// })

//DELETE A POST
// router.delete('/:postID', auth, async (req, res) => {
//   try {
//     const removedPost = await Post.remove({ _id: req.params.postID })
//     res.json(removedPost)
//   } catch (error) {
//     res.json({ message: error })
//   }
// })

module.exports = router