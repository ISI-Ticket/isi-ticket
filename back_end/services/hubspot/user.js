const request = require('request');
const hubspot = require('../../api_options/hubspot/contactsOpt');

const findUserByEmail = (email)=> {
    let options = hubspot.findByEmail(email);
    let user;
    request(options, function (error, response, body){
        json = JSON.parse(body);
        user = contactsOpt.userInfo(json.properties.email.value, json.properties.firstname.value,json.properties.lastname.value,json.properties.nif.value,json.properties.phone.value, json.properties.address.value, json.properties.city.value, json.properties.zip.value);

    });
    return user;
}
