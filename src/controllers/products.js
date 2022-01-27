
const productModel = require('../models/products')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const path = require('path')
const fs = require('fs')
// const redis = require('redis')
// const client = redis.createClient(6379);

const getProductById =(req, res, next) =>{
  const id = req.params.idsaya
  productModel.getProductById(id)
    .then((result) => {
      const products = result
      // client.setex(`product/${id}`, 60 * 60, JSON.stringify(products))
      helpers.response(res, products, 200)
    })
    .catch((error) => {
      console.log(error);
      // const err = {}
      // err.message = "add error di mysql"
      // err.status = 501
      // const err = new Error('ada error di mysql')
      // err.status = 501
   
      const err = new createError.InternalServerError()
      next(err)
    })
}

const getAllProduct = (req, res, next) => {
  // const page = parseInt(req.query.page) || 1
  // const limit = req.query.limit || 10
  // const search = req.query.search || ''
  // console.log('page', page);
  // console.log('limit', limit);
  // console.log('search', search);
  productModel.getAllproduct()
  .then((result)=>{
    const products = result
    // client.setex('allProduct', 60 * 60, JSON.stringify(products))
    helpers.response(res, products, 200)
  })
  .catch((error)=>{
    console.log(error);
    // const err = {}
    // err.message = "add error di mysql"
    // err.status = 501
    // const err = new Error('ada error di mysql')
    // err.status = 501
    const err = new createError.InternalServerError()
    next(err)
  })
}

const insertProduct = (req, res, next)=>{
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const {name, price, description} = req.body
  console.log(__dirname);
  const data = {
    name: name,
    price: price,
    description: description,
    image: `${process.env.BASE_URL}/file/${req.file.filename}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  // errror
  console.log(path.extname(req.file.filename));
  productModel.insertProduct(data)
  .then((result)=>{
    helpers.response(res, result, 200)
  })
  .catch((error)=>{
    console.log(error);
   
    helpers.response(res, null, 500, {message: 'internal server error'})
  })
} 


const updateProduct = (req, res) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { name, price, description } = req.body
  const data = {
    name: name,
    price: price,
    description: description,
    updatedAt: new Date()
  }
  productModel.updateProduct(id, data)
    .then(() => {
      res.json({
        message: 'data berhasil di insert',
        data: data
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
      res.json({
        message: 'internal server error'
      })
    })
}

const deleteProduct = (req, res)=>{
  const id = req.params.id
  productModel.deleteProduct(id)
  .then(()=>{
    res.status(200)
    res.json({
      message: 'data berhasil di hapus',
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(500)
    res.json({
      message: 'internal server error'
    })
  })
}
module.exports = {
  getAllProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductById
}