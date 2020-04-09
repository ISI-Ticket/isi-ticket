const paymentJSON = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "",
        "cancel_url": "http://127.0.0.1:5500/isi-ticket/front_end/vendor/pages/comprar.html"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "",
                "sku": "",
                "price": "",
                "currency": "EUR",
                "quantity": ""
            }]
        },
        "amount": {
            "currency": "EUR",
            "total": "0"
        },
        "description": "This is the payment description."
    }]
};

const exePayment = {
    "payer_id": "",
    "transactions": [{
        "amount": {
            "currency": "EUR",
            "total": "2.05"
        }
    }]
  };

exports.paymentJSON = paymentJSON;
exports.exePayment = exePayment;