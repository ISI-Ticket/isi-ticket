const express = require('express');
const router = express.Router();
const sales = require('../requests/jasmin/costumer');
const invoice = require('../requests/jasmin/invoice');
const authOpt = require('../options/jasmin/authOpt');
const request = require('request');
const saleDB = require('../dbQueries/saleDB');
const ticketDB = require('../dbQueries/ticketDB');
const clientDB = require('../dbQueries/clientDB');
const send = require('../requests/nodemailer/send');
const fs = require('fs')
let token;
/*router.use(function (req, res, next) {
    let json;
    request(authOpt, function (error, response, body) {
        if (error) throw new Error(error);
        json = JSON.parse(body);
        token = "Bearer " + json.access_token;
        next();
    });
});*/
router.post('/getCostumer', (req, res) => {
    let nif = req.body.nif;
    sales.findCostumer(nif, token);
});

router.post('/createCustomer', (req, res) => {
    sales.createCostumer(req.body.user, req.body.token);
    res.send("sim");
})

router.get('/test/:clientID', (req, res) => {
    saleDB.select(req.params.clientID, res);
});

router.get('/history/:clientID', (req, res) => {
    ticketDB.select(req.params.clientID, res);
});

router.get('/sendEmail', (req, res) => {
    send.sendEmail("eduardogomes9995@gmail.com");
    res.send("it works");
})

router.get('/send', (req, res) => {
    invoice.get('22').then((data) => {
        var writeStream = fs.createWriteStream('../response.pdf')
        data.body.pipe(writeStream);
        res.send(writeStream);
    })


})


router.post('/testeuser', (req, res) => {
    clientDB.insert(req.body.clientID, req.body.firstname, req.body.lastname, req.body.email);
    res.send('ok')
})

router.get('/testeGetLastId', (req, res) => {
    clientDB.getLastId()
        .then(result => {
            res.send({ 'lastId': `${result}` });
        })
});

router.get('/testeId', (req, res) => {
    let id = "ce7b5e50-2192-ea11-99e5-0003ff2428de";
    
    console.log(id.replace(/"/g, ""));
    res.send({ 'id': `${id}` });

});



module.exports = router;