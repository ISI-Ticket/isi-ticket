const keys = require('../../config/api_keys.js');
const findByEmail = (email) =>{
 options = { 
    method: 'GET',
    url: `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`,
    qs: { hapikey: keys.hubSpotKey }
  }
  return options;
}

const createUser = (email, firstname, lastname, nif, phone, address, city, zip) =>{ 
   let options =  { method: 'POST',
    url: 'https://api.hubapi.com/contacts/v1/contact/',
    qs: { hapikey: keys.hubSpotKey },
    headers: 
     { 
       'Content-Type': 'application/json' },
    body: 
     { properties: 
        [ { property: 'email', value: `${email}` },
          { property: 'firstname', value: `${firstname}` },
          { property: 'lastname', value: `${lastname}` },
          { property: 'nif', value: `${nif}` },
          { property: 'phone', value: `${phone}` },
          { property: 'address', value: `${address}` },
          { property: 'city', value: `${city}` },
          { property: 'zip', value: `${zip}`} ] },
    json: true };
  return options;
}


const userInfo = (email, firstname, lastname, nif, phone, address, city, zip) =>{
  let userInfo = {
    exists : true,
    email : `${email}`,
    firstname : `${firstname}`,
    lastname : `${lastname}`,
    nif : `${nif}`,
    phone : `${phone}`,
    address : `${address}`,
    city : `${city}`,
    zip : `${zip}`
  }
  return userInfo;
}

exports.findByEmail = findByEmail;
exports.createUser = createUser;
exports.userInfo = userInfo;
