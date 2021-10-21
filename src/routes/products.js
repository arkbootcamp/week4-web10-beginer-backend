const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const upload = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const redisCache = require('../middlewares/redis')
// const mymiddle = (req, res, next)=>{
//   // res.send('hello ini middle saya')
//   console.log('saya mengolah data terlebih dahulu');
//   // next()
// }
// const auth = (req, res, next)=>{
//   const authValid = true
//   if(authValid){
//     next()
//   }else{
//     res.json({
//       message: 'auth failed'
//     })
//   }
// }
router
  .get('/', auth.verifyAccess, redisCache.hitCacheAllProduct, productController.getAllProduct)
  .get('/:idsaya', auth.verifyAccess, redisCache.hitCacheProductId, productController.getProductById)
  .post('/', redisCache.clearRedisProduct, upload.single('image'), productController.insertProduct)
  .put('/:id', auth.verifyAccess, productController.updateProduct)
  .delete('/:id', auth.verifyAccess, productController.deleteProduct)

module.exports = router