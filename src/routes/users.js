const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

  router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/refreshtoken', userController.refreshToken)

module.exports = router