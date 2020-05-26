const express = require('express');
const router = express.Router();
const request = require('request');
const contactsOpt = require('../options/hubspot/contactsOpt');


router.post('/signin', (req,res)=>{
    let data = contactsOpt.userInfo;
    data.email = req.body.email;
    let options =  contactsOpt.findByEmail(req.body.email);
    let json = '';
    request(options, function (error, response, body) {
        json = JSON.parse(body);
        if(json.status == 'error'){
            let nope = {
                exists : false
            }
            res.send(nope);
        }else {
            data = contactsOpt.userInfo(json.properties.email.value, json.properties.firstname.value,json.properties.lastname.value,json.properties.nif.value,json.properties.phone.value, json.properties.address.value, json.properties.city.value, json.properties.zip.value);
            res.send(data);
        };
    }); 
});

router.post('/signup', (req,res)=> {
    let options = contactsOpt.createUser(req.body.email,req.body.firstname,req.body.lastname, req.body.nif, req.body.phone, req.body.address, req.body.city, req.body.zip);
    let email = req.body.email
    let firstname = req.body.firstname
    let lastname  = req.body.lastname
    let nif = req.body.nif
    let phone = req.body.phone
    let address = req.body.address
    let city = req.body.city
    let zip = req.body.zip
    let data = {email,firstname,lastname,nif,phone,address,city,zip}
    console.log(options.body.properties);
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(data);
    });
    
});

module.exports = router;

