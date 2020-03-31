const express = require('express');
const router = express.Router();
const request = require('request');
const contacts = require('../api_options/hubspot/contacts');

router.post('/signin', (req,res)=>{
    let data = {
        exists : true,
        email : req.body.email,
        firstname : "",
        lastname : "",
        phone : "",
        address : "",
        city : "",
        zip : ""
    }
    let options =  contacts.findByEmail;
    options.url += req.body.email + "/profile";
    var json = '';
    request(options, function (error, response, body) {
        json = JSON.parse(body);
        if(json.status === "error"){
            data.exists = false;
            res.send(data);
        }else {
            data.firstname = json.properties.firstname.value;
            data.lastname = json.properties.lastname.value;
            data.phone = json.properties.phone.value;
            data.address = json.properties.address.value;
            data.city = json.properties.city.value;
            data.zip = json.properties.zip.value;
            console.log(data);
            res.send(data);
        };
    }); 
});

router.post('/signup', (req,res)=> {
    let options = contacts.createUser;
    options.body.properties[0].value = req.body.email;
    options.body.properties[1].value = req.body.firstname;
    options.body.properties[2].value = req.body.lastname;
    options.body.properties[3].value = req.body.phone;
    options.body.properties[4].value = req.body.address;
    options.body.properties[5].value = req.body.city;
    options.body.properties[6].value = req.body.zip;
    for(let property of options.body.properties){
        console.log(property.value);
    }
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
    });
    res.end();
});

module.exports = router;