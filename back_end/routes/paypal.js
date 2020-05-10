const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const paypalAuth = require('../config/paypal_auth');
const paypalOptions = require('../options/paypal/payment')
const hubspot = require('../requests/hubspot/user');
const jasmin = require('../requests/jasmin/costumer')
const invoice = require('../requests/jasmin/invoice');
const moloni = require('../requests/moloni/products');
const moloniAuth = require('../requests/moloni/moloniLogin');

paypal.configure({
    'mode': 'sandbox',
    'client_id': paypalAuth.clientID,
    'client_secret': paypalAuth.secret
});

router.post('/pay', (req, res) => {
    console.log(req.body)
    let options = paypalOptions.paymentJSON;
    setOptions(options, req.body).then(options => {
        //console.log(options);
        //console.log(options.transactions[0].item_list);
        /*paypal.payment.create(options, function (error, payment) {
            if (error) {
                console.log(JSON.stringify(error))
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.send({ 'url': `${payment.links[i].href}` });
                    }
                }
            }
        });*/
    });
});

router.get('/success/:total', (req, res) => {
    console.log("chegeui");
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
                            console.log('Party ' + customerPartyKey);
                            invoice.create(costumerKey, items).then((invoiceID) => {
                                invoice.get(invoiceID, payment.payer.payer_info.email)
                            })
                        });
                    }
                })
            })
            res.redirect('http://localhost:5500/front_end/vendor/pages/carteira.html');
        }
    });
});

function setOptions(options, cart) {
    return new Promise((resolve, reject) => {

        let date = new Date();

        cycle(cart).then(data => {
            options.transactions[0].item_list.items = data.items;
            options.transactions[0].description = `Compra feita com sucesso no dia ${date}`;
            let total = data.add;
            options.transactions[0].amount.total = total.toString();
            options.redirect_urls.return_url = `http://127.0.0.1:5000/paypal/success/${total.toString()}`;

            resolve(options);
        });

    });
}

function cycle(cart) {
    return new Promise((resolve, reject) => {
        let items = [];
        let add = 0;

        moloniAuth.auth().then(token => {
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
                        moloni.getProductStock(token, 'Senha simples').then(stock => {
                            if (item.quantity > stock) {
                                res.send('Não existem Senhas simples em quantidade suficiente para efetuar a sua compra!');
                            } else {
                                itemObj.name = "Senha simples";
                                itemObj.sku = "001";
                                itemObj.price = "2.05"
                                itemObj.currency = "EUR";
                                itemObj.quantity = item.quantity;
                                add += +(2.05 * item.quantity).toFixed(2);
                                items.push(itemObj);
                            }
                        });
                        break;
                    case '2':
                        moloni.getProductStock(token, 'Senha completa').then(stock => {
                            if (item.quantity > stock) {
                                res.send('Não existem Senhas completas em quantidade suficiente para efetuar a sua compra!');
                            } else {
                                itemObj.name = "Senha completa";
                                itemObj.sku = "002";
                                itemObj.price = "2.75"
                                itemObj.currency = "EUR";
                                itemObj.quantity = item.quantity
                                add += +(2.75 * item.quantity).toFixed(2);
                                items.push(itemObj);

                            }
                        });
                        break;
                    case '3':
                        moloni.getProductStock(token, 'Senha grill').then(stock => {
                            if (item.quantity > stock) {
                                res.send('Não existem Senhas grill em quantidade suficiente para efetuar a sua compra!');
                            } else {
                                itemObj.name = "Senha grill";
                                itemObj.sku = "003";
                                itemObj.price = "5.50"
                                itemObj.currency = "EUR";
                                itemObj.quantity = item.quantity
                                add += +(5.50 * item.quantity).toFixed(2);
                                items.push(itemObj);
                            }
                        });
                        break;
                    case '4':
                        moloni.getProductStock(token, 'Senha rampa B').then(stock => {
                            if (item.quantity > stock) {
                                res.send('Não existem Senhas rampa B em quantidade suficiente para efetuar a sua compra!');
                            } else {
                                itemObj.name = "Senha rampa B";
                                itemObj.sku = "004";
                                itemObj.price = "4.05"
                                itemObj.currency = "EUR";
                                itemObj.quantity = item.quantity
                                add += +(4.05 * item.quantity).toFixed(2);;
                                items.push(itemObj);
                            }
                        });
                        break;
                    case '5':
                        moloni.getProductStock(token, 'Pack senhas').then(stock => {
                            if (item.quantity > stock) {
                                res.send('Não existem Pack senhas em quantidade suficiente para efetuar a sua compra!');
                            } else {
                                itemObj.name = "Pack senhas";
                                itemObj.sku = "005";
                                itemObj.price = "26.50"
                                itemObj.currency = "EUR";
                                itemObj.quantity = item.quantity
                                add += +(26.50 * item.quantity).toFixed(2);;
                                items.push(itemObj);
                            }
                            console.log(items)
                        });
                        break;
                }

                const result = {
                    items: items,
                    add: add
                }

                resolve(result);
            }
        });
    });
}

module.exports = router;
