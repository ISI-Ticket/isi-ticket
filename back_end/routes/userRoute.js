const express = require('express');
const router = express.Router();
const request = require('request');
const contactsOpt = require('../options/hubspot/contactsOpt');


router.post('/signin', (req,res)=>{
    let data = contactsOpt.userInfo;
    data.email = req.body.email;
    let options =  contactsOpt.findByEmail(req.body.email);
    var json = '';
    request(options, function (error, response, body) {
        json = JSON.parse(body);
        if(json.status === "error"){
            data.exists = false;
            res.send(data);
        }else {
            data = contactsOpt.userInfo(json.properties.email.value, json.properties.firstname.value,json.properties.lastname.value,json.properties.nif.value,json.properties.phone.value, json.properties.address.value, json.properties.city.value, json.properties.zip.value);
            console.log(data);
            res.send(data);
        };
    }); 
});
router.post('/signup', (req,res)=> {
    let options = contactsOpt.createUser(req.body.email,req.body.firstname,req.body.lastname, req.body.nif, req.body.phone, req.body.address, req.body.city, req.body.zip);
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
    res.end();
});

module.exports = router;