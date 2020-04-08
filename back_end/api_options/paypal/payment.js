const paymentJSON = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://127.0.0.1:5000/paypal/success",
        "cancel_url": "http://127.0.0.1:5500/isi-ticket/front_end/vendor/pages/comprar.html"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Senha simples",
                "sku": "001",
                "price": "25.00",
                "currency": "EUR",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "EUR",
            "total": "25.00"
        },
        "description": "This is the payment description."
    }]
};

const exePayment = {
    "payer_id": "",
    "transactions": [{
        "amount": {
            "currency": "EUR",
            "total": "25"
        }
    }]
  };

exports.paymentJSON = paymentJSON;
exports.exePayment = exePayment;