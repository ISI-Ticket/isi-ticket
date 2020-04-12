const express = require('express');
const router = express.Router();
const sales = require('../services/jasmin/costumer');
const invoice = require('../services/jasmin/invoice');
const authOpt = require('../api_options/jasmin/authOpt');
const request = require('request');
const saleDB = require('../dbQueries/saleDB');
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
router.post('/getCostumer', (req,res) => {
    let nif = req.body.nif;
    sales.findCostumer(nif,token);
});

router.post('/createCustomer', (req,res) =>{
    sales.createCostumer(req.body.user, req.body.token);
    res.send("sim");
})

router.get('/test/:clientID', (req,res) =>{
    saleDB.select(req.params.clientID, res);
   
});


module.exports = router;