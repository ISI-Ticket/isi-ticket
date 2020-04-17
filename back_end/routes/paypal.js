const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const paypalAuth = require('../config/paypal_auth');
const paypalOptions = require('../options/paypal/payment')
const hubspot = require('../requests/hubspot/user');
const jasmin = require('../requests/jasmin/costumer')
const invoice = require('../requests/jasmin/invoice');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': paypalAuth.clientID,
    'client_secret': paypalAuth.secret
});


router.post('/pay', (req, res) => {
    console.log(req.body)
    let options = paypalOptions.paymentJSON;
    options = setOptions(options, req.body);
    paypal.payment.create(options, function (error, payment) {
        if (error) {
            console.log(JSON.stringify(error))
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
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
            hubspot.findUserByEmail(payment.payer.payer_info.email).then((user) => {
                jasmin.findCostumer(user.nif).then((costumer) => {
                    if (costumer.customerPartyKey != null) {
                        invoice.create(costumer.customerPartyKey, items).then((reference) => { invoice.get(reference) })
                    } else {
                        jasmin.createCostumer(user).then((costumerKey) => {
                            invoice.create(costumerKey, items).then((seriesNUM) => { console.log(seriesNUM) })
                        });
                    }
                })
            })
            res.redirect('http://127.0.0.1:5500/isi-ticket/front_end/vendor/pages/carteira.html');
        }
    });
});


function setOptions(options, cart) {
    let items = [];

    let date = new Date();
    let add = 0;
    for (item of cart.items) {
        let itemObj = {
            name: "",
            sku: "",
            price: "",
            currency: "EUR",
            quantity: ""
        }
        switch (item.ticketID) {
            case '1':
                itemObj.name = "Senha simples";
                itemObj.sku = "001";
                itemObj.price = "2.05"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity;
                add += +(2.05 * item.quantity).toFixed(2);
                items.push(itemObj);
                break;
            case '2':
                itemObj.name = "Senha completa";
                itemObj.sku = "002";
                itemObj.price = "2.75"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(2.75 * item.quantity).toFixed(2);
                items.push(itemObj);
                break;
            case '3':
                itemObj.name = "Senha grill";
                itemObj.sku = "003";
                itemObj.price = "5.50"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(5.50 * item.quantity).toFixed(2);
                items.push(itemObj);
                break;
            case '4':
                itemObj.name = "Senha rampa B";
                itemObj.sku = "004";
                itemObj.price = "4.05"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(4.05 * item.quantity).toFixed(2);;
                items.push(itemObj);
                break;
        }
    }
    options.transactions[0].item_list.items = items;
    options.transactions[0].description = `Compra feita com sucesso no dia ${date}`;
    let total = add;
    options.transactions[0].amount.total = total.toString();
    options.redirect_urls.return_url = `http://127.0.0.1:5000/paypal/success/${total.toString()}`;
    return options;
}



module.exports = router;
