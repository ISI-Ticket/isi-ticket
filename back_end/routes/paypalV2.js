const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const paypalAuth = require('../config/paypal_auth');
const paypalOptions = require('../options/paypal/payment')
const hubspot = require('../requests/hubspot/user');
const jasminCostumer = require('../requests/jasmin/costumer')
const jasminInvoice = require('../requests/jasmin/invoice');
const moloni = require('../requests/moloni/products');
const moloniCostumer = require('../requests/moloni/costumer')
const moloniInvoice = require('../requests/moloni/invoice')
const moloniAuth = require('../requests/moloni/moloniLogin');

paypal.configure({
    'mode': 'sandbox',
    'client_id': paypalAuth.clientID,
    'client_secret': paypalAuth.secret
});

router.post('/pay/:email', (req, res) => {
    console.log("sou o v2")
    let options = paypalOptions.paymentJSON;
    setOptions(options, req.body, req.params.email).then(options => {
        paypal.payment.create(options, function (error, payment) {
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
        });
    });
});

router.get('/success/:total/:mail', (req, res) => {
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
            hubspot.findUserByEmail(req.params.mail).then((user) => {
                console.log(user);
                jasminCostumer.find(user.nif).then((costumer) => {
                    if (costumer != null) {
                        jasminInvoice.create(costumer.customerPartyKey, items).then((invoiceID) => {
                            moloniInvoice.insert(items, costumer.customerPartyKey, total).then(body => {
                                jasminInvoice.get(invoiceID, req.params.mail)
                            })  
                        })
                    } else {
                        moloniCostumer.insert(user).then(costumerId => {
                            jasminCostumer.create(user, costumerId).then(costumerKey => {
                                moloniInvoice.insert(items, costumerId, total).then(body => {
                                    jasminInvoice.create(costumerKey, items).then((invoiceID) => {
                                        jasminInvoice.get(invoiceID, payment.payer.payer_info.email)
                                    })
                                });

                            })
                        })
                    }
                })
            })
            res.redirect("https://isi-ticket.herokuapp.com/vendor/pages/carteira.html");
        }
    });
});

function setOptions(options, cart, email) {
    return new Promise(resolve => {
        let date = new Date();

        let data = cycle(cart);
        for (product of data.itemsFinal) {
            moloni.getProductStock(product.name).then(stock => {
                if (data.itemsFinal.quantity > stock) {
                    res.send(`Não existem ${product.name} em quantidade suficiente para efetuar a sua compra!`);
                } else {
                    options.transactions[0].item_list.items = data.itemsFinal;
                    options.transactions[0].description = `Compra feita com sucesso no dia ${date}`;
                    let total = data.add;
                    options.transactions[0].amount.total = total.toString();
                    options.redirect_urls.return_url = `https://isi-ticket-api.herokuapp.com/paypalV2/success/${total.toString()}/${email}`;
                    resolve(options);
                }
            })
        }
    });
}

function cycle(cart) {
    let itemsFinal = [];
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
                itemsFinal.push(itemObj);
                break;
            case '2':

                itemObj.name = "Senha completa";
                itemObj.sku = "002";
                itemObj.price = "2.75"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(2.75 * item.quantity).toFixed(2);
                itemsFinal.push(itemObj);

                break;
            case '3':
                itemObj.name = "Senha grill";
                itemObj.sku = "003";
                itemObj.price = "5.50"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(5.50 * item.quantity).toFixed(2);
                itemsFinal.push(itemObj);
                break;
            case '4':
                itemObj.name = "Senha rampa B";
                itemObj.sku = "004";
                itemObj.price = "4.05"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(4.05 * item.quantity).toFixed(2);
                itemsFinal.push(itemObj);
                break;
            case '5':
                itemObj.name = "Pack de senhas completas";
                itemObj.sku = "005";
                itemObj.price = "26.50"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(26.50 * item.quantity).toFixed(2);;
                itemsFinal.push(itemObj);
                break;
            case '6':
                itemObj.name = "Pack de senhas Simples";
                itemObj.sku = "006";
                itemObj.price = "18.00"
                itemObj.currency = "EUR";
                itemObj.quantity = item.quantity
                add += +(18.00 * item.quantity).toFixed(2);;
                itemsFinal.push(itemObj);
                break;
        }
    }

    const result = {
        itemsFinal: itemsFinal,
        add: add
    }

    return result;
}

module.exports = router;
