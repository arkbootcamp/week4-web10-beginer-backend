const nodemailer = require("nodemailer");
const styleHTML = require('./styleHTML')
const jwt = require('jsonwebtoken')
const sendEmail = (toEmail, token)=>{
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "Gmail",
    auth: {
      user: 'fullstackwebarka@gmail.com', // generated ethereal user
      pass: 'Arkademy1234#', // generated ethereal password
    },
  });

  transporter.sendMail({
    from: 'fullstackwebarka@gmail.com', // sender address
    to: toEmail, // list of receivers
    subject: "verifikasi email", // Subject line
    // text: "lagi ngapain bro !!! ", // plain text body
    html: styleHTML(token), // html body
  })
  .then((res)=>{
    console.log(res);
  })
  
  .catch((err)=>{
    console.log('error', err);
  })
}

const generateToken = (payload)=>{
  return new Promise((resolve, reject)=>{
    const verifyOptions = {
      expiresIn: '15s',
      issuer: 'E-commerce-KU'
    }
    jwt.sign(payload, process.env.SECRET_KEY, verifyOptions, function (err, token) {
      if (!err){
        resolve(token)
      }else{
        reject(err)
      }
    });
  })
}
const generateRefreshToken = (payload)=>{
  return new Promise((resolve, reject) => {
    const verifyOptions = {
      expiresIn: '20s',
      issuer: 'E-commerce-KU'
    }
    jwt.sign(payload, process.env.SECRET_KEY, verifyOptions, function (err, token) {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    });
  })
}


module.exports = {
  sendEmail,
  generateToken,
  generateRefreshToken
}