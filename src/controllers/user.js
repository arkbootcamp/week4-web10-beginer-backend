const userModels = require('../models/users')
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const common = require('../helpers/common')

const register = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password, phone } = req.body
  
  const user = await userModels.findUser(email)
  if (user.length >0){
    return helpers.response(res, null, 401, {message: 'email sudah ada'})
  }
  console.log(user);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
      const data = {
        id: uuidv4(),
        name: name,
        email: email,
        password: hash,
        phone: phone,
        status: 0,
      }

      userModels.insertUser(data)
        .then((result) => {
          delete data.password
          // verifikasi user via email
         
          jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '12h' }, function (err, token) {
            common.sendEmail(data.email, token)
            helpers.response(res, user, 200)
          });
          helpers.response(res, data , 200)
        })
        .catch((error) => {
          console.log(error);
          helpers.response(res, null, 500, { message: 'internal server error' })
        })
    });
  });
}

const login = async (req, res, next)=>{
  const {email, password} = req.body
  const result = await userModels.findUser(email)
  const user = result[0]
  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare){
      return helpers.response(res, null, 401, { message: 'password wrong' })
    }
    // generate token
    jwt.sign({ email: user.email, role: '1' }, process.env.SECRET_KEY , { expiresIn: '24h'  }, async function (err, token) {
      console.log(new Date());
      delete user.password
      const dataPayload = {
        name: user.name,
        emai: user.email
      }
      user.token = await common.generateToken(dataPayload)
      user.refreshToken = await common.generateRefreshToken(dataPayload)
      // res.cookie('risanoAuth', token, {
      //   // domain: '.sample-nextjs-coral.vercel.app',
      //   httpOnly: true,
      //   // maxAge: 'Session',
      //   // maxAge: 1000*60*10,
      //   secure: true,
      //   path: '/',
      //   sameSite: 'none',
      //   // domain: '.fwebdev.xyz'
      // // })
      // res.cookie('token', token, {
      //   // domain: '.sample-nextjs-coral.vercel.app',
      //   httpOnly: true,
      //   maxAge: 1000*60*20,
      //   secure: true,
      //   path: '/',
      //   sameSite: 'none'
      //   // sameSite: 'strict',
      //   // domain: '.fwebdev.xyz'
      // })
      helpers.response(res, user, 200)
    });
   
  });
}
const refreshToken = async(req, res, next)=>{
  try {
    const verifyOption = {
      issuer: 'E-commerce-KU'
    }
    const refreshToken = req.body.refreshToken
    console.log(refreshToken);
    const decoded = await jwt.verify(refreshToken, process.env.SECRET_KEY, verifyOption);
    
    const newDataPayload = {
      name: decoded.name,
      email: decoded.email
    }

    const newToken = await common.generateToken(newDataPayload)
    const newRefreshToken = await common.generateRefreshToken(newDataPayload)
    const result = {
      token: newToken,
      refreshToken: newRefreshToken
    }
    helpers.response(res, result, 200)
    // jwt.verify(refreshToken, process.env.SECRET_KEY, function (err, decoded) {
    //   if (err) {
    //     if (err.name === 'TokenExpiredError') {
    //       const error = new Error('token expired')
    //       error.status = 401
    //       return next(error)
    //     } else if (err.name === 'JsonWebTokenError') {
    //       const error = new Error('token invalid')
    //       error.status = 401
    //       return next(error)
    //     } else {
    //       const error = new Error('token not active')
    //       error.status = 401
    //       return next(error)
    //     }

    //   }
      // req.role = decoded.role
      // next()
    // });
  } catch (err) {
    console.log(err);
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error('token expired')
        error.status = 401
        return next(error)
      } else if (err.name === 'JsonWebTokenError') {
        const error = new Error('token invalid')
        error.status = 401
        return next(error)
      } else {
        const error = new Error('token not active')
        error.status = 401
        return next(error)
      }
    }
    // helpers.response(res, {message: 'Internal Server Error'}, 500)
  }
}
module.exports = {
  register,
  login,
  refreshToken
}