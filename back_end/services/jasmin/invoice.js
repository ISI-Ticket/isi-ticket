const request = require('request');
const jasminLogin =require('./jasminLogin');
const invoiceOpt = require('../../api_options/jasmin/invoiceOpt');
const saleDB = require('../../dbQueries/saleDB');
var index = 16;
const create = (customerPartyKey, items) =>{
    return new Promise((resolve, reject) =>{
        jasminLogin.auth().then((token) =>{
            let invoice = invoiceOpt.info(customerPartyKey, items);
            let options = invoiceOpt.createInvoiceOpt(token, invoice);
            console.log(options);
            index += 1;
            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong");
                else{
                    saleDB.insert(customerPartyKey, "2020-05-12", items, index.toString());
                    resolve(index.toString());
                }
            });
        });
    });
}

exports.create = create;