const request = require('request');
const moloniAuth = require('../../requests/moloni/moloniLogin');
const invoiceOpt = require('../../options/moloni/invoiceOpt');

const insert = (items, costumerID, total) => {
    return new Promise((resolve, reject) => {
        moloniAuth.auth().then(token => {
            const options = invoiceOpt.insertInvoiceOpt(token, items, costumerID, total);
            console.log(options);
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error)
                    reject(error);
                }else{
                    json = JSON.parse(body);
                    console.log(json);
                    resolve(json);

                }
            
            });
        })
    });
}

module.exports.insert = insert;