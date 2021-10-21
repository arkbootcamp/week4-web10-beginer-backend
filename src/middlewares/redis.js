const redis = require('redis')
// const client = redis.createClient(6379);
const helpers = require('../helpers/helpers')

const hitCacheAllProduct = (req, res, next)=>{
  return next()
  // client.get("allProduct", function (err, data) {
  //   // reply is null when the key is missing
  //   if (data !== null){
  //     const result = JSON.parse(data)
  //     return helpers.response(res, result, 200)
  //   }else{
  //     next()
  //   }
  // });
}
const hitCacheProductId = (req, res, next) => {
  return next()
  // const id = req.params.idsaya
  // client.get(`product/${id}`, function (err, data) {
    // reply is null when the key is missing
    // if (data !== null) {
    //   const result = JSON.parse(data)
    //   console.log('data cache di hit');
    //   return helpers.response(res, result, 200)
    // } else {
    //   next()
    // }
  // });
}
const clearRedisProduct = (req, res, next)=>{
  return next()
  // client.del('allProduct')
  // next()
}
module.exports = {
  hitCacheAllProduct,
  hitCacheProductId,
  clearRedisProduct
}