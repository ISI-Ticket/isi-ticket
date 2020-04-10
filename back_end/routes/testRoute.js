const express = require('express');
const router = express.Router();
const sales = require('../services/jasmin/sales');
const authOpt = require('../api_options/jasmin/authOpt');
const request = require('request');
let token;
router.use(function (req, res, next) {
    let json;
    request(authOpt, function (error, response, body) {
        if (error) throw new Error(error);
        json = JSON.parse(body);
        token = "Bearer " + json.access_token;
        next();
    });
});

router.post('/getCostumer', (req,res) => {
    let nif = req.body.nif;
    sales.findCostumer(nif,token);
});


module.exports = router;