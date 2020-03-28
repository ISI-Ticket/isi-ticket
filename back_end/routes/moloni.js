const express = require('express');
const router = express.Router();
const request = require('request');
const params = require('../api_options/moloni/auth');
var refresh_token = '';
var access_token = '';

router.get('/doSomething', (req,res) => {
        loginMoloni();
        res.send("yep")
    
});


router.post('/insertInvoice', (req,res) =>{
    

});

function loginMoloni() {
    var bodyParsed = ''; 
    request(params.auth, function (error, response, body) {
        if (error) throw new Error(error);
        bodyParsed = JSON.parse(body);
        console.log(bodyParsed);
        access_token = bodyParsed.access_token;
        console.log(access_token);
    });

    console.log("asd" + bodyParsed)
}


module.exports = router;