const express = require('express');
const router = express.Router();
const request = require('request');
const auth_options = require('../api_options/jasmin/authOpt');
const sales_options = require('../api_options/jasmin/salesOpt');
var access_token = '';

 function loginJasmin(){
    if(access_token === ''){
        let json = '';
        request(auth_options, function (error, response, body) {
            if (error) throw new Error(error);
            json = JSON.parse(body);
            console.log(json);
            access_token = "Bearer " + json.access_token;
        });
    }
}

router.get('/getInvoices', (req,res) =>{
    loginJasmin();
    console.log(access_token);
    let options = sales_options.getInvoices;
    options.headers.Authorization = access_token;
    console.log(options);
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.send(body);
    });
});




router.get('/login', (req,res) =>{
    loginJasmin();
    res.send('done');
});



module.exports = router;