const jwt = require('jsonwebtoken')

const verifyAccess = (req, res, next)=>{
  const bearerToken = req.headers.authorization
  // const token = req.cookies.token
  // console.log(req.cookies);
  // console.log(token);
  let token = null
  if (bearerToken){
    token = bearerToken.split(' ')[1]
  }
  if (!token){
    const error = new Error('server need token')
    error.code = 401
    return next(error)
  }
  // const result = token.split(' ')[1]
  // console.log(result);
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err){
      if (err.name ==='TokenExpiredError'){
      const error = new Error('token expired')
      error.status = 401
      return next(error)
      } else if (err.name === 'JsonWebTokenError'){
        const error = new Error('token invalid')
        error.status = 401
        return next(error)
      }else{
        const error = new Error('token not active')
        error.status = 401
        return next(error)
      }
     
    }
   req.role = decoded.role
    next()
  });
} 
module.exports ={
  verifyAccess
}
  