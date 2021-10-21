const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment')

router
  .post('/pay', paymentController.payPayment)
  .get('/:orderId', paymentController.getPayment)
  // .post('/login', userController.login)

module.exports = router