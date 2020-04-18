const request = require('request');
const jasminLogin =require('./jasminLogin');
const invoiceOpt = require('../../options/jasmin/invoiceOpt');
const saleDB = require('../../dbQueries/saleDB');
const nodemailer = require('../nodemailer/send');
const fs = require('fs');
var index = 51;
const create = (customerPartyKey, items) =>{
    let date = new Date();
    let day = date.getDate();
    let monthJS = date.getMonth();
    let month = (parseInt(monthJS) + 1).toString()
    let year = date.getFullYear();
    console.log(`${year}-${month}-${day}`);
    return new Promise((resolve, reject) =>{
        jasminLogin.auth().then((token) =>{
            let invoice = invoiceOpt.info(customerPartyKey, items);
            let options = invoiceOpt.createInvoiceOpt(token, invoice);
            console.log(options);
            index += 1;
            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong");
                else{
                    saleDB.insert(customerPartyKey, `${year}-${month}-${day}`, items, index.toString());
                    resolve(index.toString());
                }
            });
        });
    });
}

const get = (reference) =>{
jasminLogin.auth().then((token) =>{
    let options = invoiceOpt.getInvoiceOpt(token, reference);
    console.log(options);
    request(options, function (error, response, body) {
        let file = '../../fatura.pdf'
        if (error) ("Oops something went wrong: " + error);
        else{
            fs.writeFile(file, body, 'binary', function(err) {
                if(err) console.log(err);
                else console.log("The file was saved!");
                nodemailer.sendEmail("clientisiticket@gmail.com");
            }); 
        }
    });
});
}



exports.get = get;
exports.create = create;