const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const paypalAuth = require('../imp_info/paypal_auth');
const paypalOptions = require('../api_options/paypal/payment')
const hubspot = require('../services/hubspot/user');
const jasmin = require('../services/jasmin/costumer')
const invoice = require('../services/jasmin/invoice');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': paypalAuth.clientID,
    'client_secret': paypalAuth.secret
});


router.post('/pay', (req,res)=>{
    let options = paypalOptions.paymentJSON;
    options = setOptions(options, req.body);
    paypal.payment.create(options, function (error, payment) {
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

router.get('/success/:total', (req, res) => {
    const payerID = req.query.PayerID;
    const paymentID = req.query.paymentId;
    let total = req.params.total;
    let executePayment = paypalOptions.exePayment;
    executePayment.payer_id = payerID;
    executePayment.transactions[0].amount.total = total;
    paypal.payment.execute(paymentID, executePayment, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          let items = payment.transactions[0].item_list.items;
          hubspot.findUserByEmail(payment.payer.payer_info.email).then((user) =>{
            jasmin.findCostumer(user.nif).then((costumer) => {
                  if(costumer.customerPartyKey != null){
                    invoice.create(costumer.customerPartyKey,items).then((seriesNUM) => { console.log(seriesNUM)})
                  }else{
                    jasmin.createCostumer(user).then((costumerKey) => {
                        invoice.create(costumerKey,items).then((seriesNUM) => { console.log(seriesNUM)})
                    });
                  }
              })
          })
          res.redirect('http://127.0.0.1:5500/isi-ticket/front_end/vendor/pages/carteira.html');
      }
  });
  });



function setOptions(options, body){
    let items = options.transactions[0].item_list.items;
    let date = new Date();
    let quantity = body.quantity;
    let add = 0;
    ticketID = body.ticketID;
    for(let i = 0; i < options.transactions[0].item_list.items.length; i++){
        switch(ticketID){
            case '1' :
                items[i].name = "Senha simples";
                items[i].sku = "001";
                items[i].price = (2.05 * quantity).toString();
                items[i].currency = "EUR";
                items[i].quantity = quantity;
                add += 2.05 * quantity;
                break;
            case '2' :
                items[i].name = "Senha completa";
                items[i].sku = "002";
                items[i].price = (2.75 * quantity).toString();
                items[i].currency = "EUR";
                items[i].quantity = quantity
                add += 2.75 * quantity;
                break;
            case '3' :
                items[i].name = "Senha grill";
                items[i].sku = "003";
                items[i].price = (5.50 * quantity).toString();
                items[i].currency = "EUR";
                items[i].quantity = quantity
                add += 5.50 * quantity;
                break;
            case '4' :
                items[i].name = "Senha rampa B";
                items[i].sku = "004";
                items[i].price = (4.05 * quantity).toString();
                items[i].currency = "EUR";
                items[i].quantity = quantity
                add += 4.05 * quantity;
                break;
          }
        
    }
    options.transactions[0].description = `Compra feita com sucesso no dia ${date}`;
    let total = add;
    options.transactions[0].amount.total = total.toString();
    console.log(options.transactions[0]);
    options.redirect_urls.return_url = `http://127.0.0.1:5000/paypal/success/${total.toString()}`
    return options;
}


  module.exports = router;
