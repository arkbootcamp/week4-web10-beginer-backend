require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require('./src/routes/index')
const morgan = require('morgan')
const setCors = require('./src/middlewares/cors')
const cors = require('cors')
const port = process.env.PORT || 3500
const createError = require('http-errors')
// const helmet = require('helmet')
// const compression = require('compression')
const cookieParser = require('cookie-parser')
// middleware

const myMiddleware = async (req, res, next) => {
  console.log('my middleware di jalankan ');
  const email = 'muhammadrisano@gamil.com'
  req.myemail = email
  // const error = new Error('ada error bro....')
  // throw error
  console.log(req.headers.origin);
  next()
}
app.use(myMiddleware)
const whitelist = ['https://sample-nextjs-coral.vercel.app', 'https://frisano.fwebdev.xyz']
const optionCors = {
  credentials: true,
  origin: 'http://localhost:3000'
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // }
}
app.use(cors(optionCors))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
// app.use(helmet())
// app.use(compression())
// my middleware
// const myMiddleware = async(req, res, next) => {
//   console.log('my middleware di jalankan ');
//   const email = 'muhammadrisano@gamil.com'
//   req.myemail = email
//   // const error = new Error('ada error bro....')
//   // throw error
//   next()
// }

// app.use(myMiddleware)
// app.use(setCors)


app.use(cookieParser())
app.use('/v1', route)
app.use('/file', express.static('./uploads'))

app.use('*', (req, res, next)=>{
  const error = new createError.NotFound()
  next(error)
  // res.status(404).json({
  //   message: 'url not found'
  // })
})



app.use((err, req, res, next)=> {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error'
  })
})

app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
})