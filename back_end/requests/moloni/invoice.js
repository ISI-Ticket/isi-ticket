const request = require('request');
const moloniAuth = require('../../requests/moloni/moloniLogin');
const invoiceOpt = require('../../options/moloni/invoiceOpt');

const insert = (body) => {
    moloniAuth.auth().then(token => {
        const options = invoiceOpt.insertInvoiceOpt(token, body);
        console.log(options);
        request(options, function (error, response, body) {
            if (error) {
                console.log(error)
            }else{
                json = JSON.parse(body);
                console.log(json);

            }
           
        });
    })
}

module.exports.insert = insert;