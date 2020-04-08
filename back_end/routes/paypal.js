const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const paypalAuth = require('../imp_info/paypal_auth');
const paypalOptions = require('../api_options/paypal/payment')
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': paypalAuth.clientID,
    'client_secret': paypalAuth.secret
});



router.post('/pay', (req,res)=>{
    req.body
    paypal.payment.create(paypalOptions.paymentJSON, function (error, payment) {
        if (error) {
            throw error;
        } else {
           for(let i = 0; i < payment.links.length; i++){
               if(payment.links[i].rel === 'approval_url'){
                   res.redirect(payment.links[i].href);
               }
           }
        }
    });
});

router.get('/success', (req, res) => {
    const payerID = req.query.PayerID;
    const paymentID = req.query.paymentId;
    let executePayment = paypalOptions.exePayment;
    executePayment.payer_id = payerID;
    paypal.payment.execute(paymentID, executePayment, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.redirect('http://127.0.0.1:5500/isi-ticket/front_end/vendor/pages/comprar.html');
      }
  });
  });

  module.exports = router;
