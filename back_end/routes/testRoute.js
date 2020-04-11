const express = require('express');
const router = express.Router();
const sales = require('../services/jasmin/costumer');
const invoice = require('../services/jasmin/invoice');
const authOpt = require('../api_options/jasmin/authOpt');
const request = require('request');
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

router.get('/test', (req,res) =>{
    /*let data = {
        compras:
        [{
            "ticketID" : 1, "quantity" : 2
        },
        {
            "ticketID" : 2, "quantity" : 2
        }
        ]
    }*/
    
});


module.exports = router;