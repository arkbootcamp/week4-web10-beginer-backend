const { json } = require('body-parser');
const midtransClient = require('midtrans-client');
// Create Core API instance
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: 'SB-Mid-server-I-xhdf9__9WlJnAM62KN3TUy',
  clientKey: 'SB-Mid-client-7GgLu0iPKtoDetWe'
});





const payPayment = (req, res) => {

  const products = req.body.products
  // 
  const dataTransaksi = {
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: 44000,
      order_id: "12348"
    },
    customer_details: {
      email: "muhammadrisano@gmail.com",
      first_name: "budi",
      last_name: "utomo",
      phone: "+6281 1234 1234"
    },
    item_details: products,
    bank_transfer: {
      bank: "bca",
    }
  }
  core.charge(dataTransaksi)
    .then((chargeResponse) => {
      // console.log('chargeResponse:');
      console.log(chargeResponse);
      res.json({
        data: chargeResponse
      })
    });

}


getPayment = (req, res)=>{
  const orderId = req.params.orderId
  core.transaction.status(orderId)
    .then((response) => {
      console.log(response);
      res.json({ data: response})
    });
}
module.exports = {
  payPayment,
  getPayment
}