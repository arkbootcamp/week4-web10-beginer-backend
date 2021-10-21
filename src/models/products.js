const connection = require('../configs/db')


const getProductById =(id)=>{
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM products where id = ?",id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getAllproduct = ()=>{
  return new Promise((resolve, reject)=>{
    connection.query("SELECT * FROM products", (error, result) => {
      if (!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
  })
}

const insertProduct = (data)=>{
  return new Promise((resolve, reject)=>{
    connection.query('INSERT INTO products SET ?', data, (error, result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
  })
}

const updateProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE products SET ? WHERE id = ?', [data, id] , (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteProduct = (id)=>{
  return new Promise((resolve, reject)=>{
    connection.query('DELETE FROM products WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getAllproduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductById
}