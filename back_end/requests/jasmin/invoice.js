const request = require('request');
const jasminLogin = require('./jasminLogin');
const invoiceOpt = require('../../options/jasmin/invoiceOpt');
const saleDB = require('../../dbQueries/saleDB');
const nodemailer = require('../nodemailer/send');
const fs = require('fs');

const create = (customerPartyKey, items) => {
    let date = new Date();
    let day = date.getDate();
    let monthJS = date.getMonth();
    let month = (parseInt(monthJS) + 1).toString()
    let year = date.getFullYear();

    return new Promise((resolve, reject) => {
        jasminLogin.auth().then((token) => {

            let invoice = invoiceOpt.info(customerPartyKey, items);
            let options = invoiceOpt.createInvoiceOpt(token, invoice);

            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong");
                else {
                    let invoiceID = response.body;
                    invoiceID = invoiceID.replace(/"/g, "");
                    console.log(invoiceID);
                    saleDB.insert(customerPartyKey, `${year}-${month}-${day}`, items, invoiceID);
                    resolve(invoiceID);
                }
            });
        });
    });
}

const getAll = (res) =>{
    jasminLogin.auth().then((token) => {
        let options = invoiceOpt.getAllInvoicesOpt(token);
        request(options, function (error, response, body) {
            res.send(body);
        })
    })  
}

const get = (invoiceID, email) => {
    jasminLogin.auth().then((token) => {
        let options = invoiceOpt.getInvoiceOpt(token, invoiceID);

        request(options, function (error, response, body) {
            let file = '../../fatura.pdf'
            if (error) ("Oops something went wrong: " + error);
            else {
                fs.writeFile(file, body, 'binary', function (err) {
                    if (err) console.log(err);
                    else { console.log("The file was saved!"); nodemailer.sendEmail(email); }

                });
            }
        });
    });
}



exports.get = get;
exports.create = create;
exports.getAll = getAll;