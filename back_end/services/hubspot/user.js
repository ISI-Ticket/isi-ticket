const request = require('request');
const hubspot = require('../../api_options/hubspot/contactsOpt');

const findUserByEmail = (email)=> {
    return new Promise((resolve,reject) =>{
        let options = hubspot.findByEmail(email);
        let user;
        request(options, function (error, response, body){
            json = JSON.parse(body);
            user = hubspot.userInfo(json.properties.email.value, json.properties.firstname.value,json.properties.lastname.value,json.properties.nif.value,json.properties.phone.value, json.properties.address.value, json.properties.city.value, json.properties.zip.value);
            if(!error){
                resolve(user);
            }else{
                reject("Something went wrong");
            }
            
        });
    })
}

exports.findUserByEmail = findUserByEmail;
