const keys = require('./apiKeys.js');
const findByEmail = { 
    method: 'GET',
    url: 'https://api.hubapi.com/contacts/v1/contact/email/',
    qs: { hapikey: keys.hubSpotKey }
}

const createUser = 
    { method: 'POST',
    url: 'https://api.hubapi.com/contacts/v1/contact/',
    qs: { hapikey: keys.hubSpotKey },
    headers: 
     { 
       'Content-Type': 'application/json' },
    body: 
     { properties: 
        [ { property: 'email', value: '' },
          { property: 'firstname', value: '' },
          { property: 'lastname', value: '' },
          { property: 'phone', value: '' },
          { property: 'address', value: '' },
          { property: 'city', value: '' },
          { property: 'zip', value: '' } ] },
    json: true };

exports.findByEmail = findByEmail;
exports.createUser = createUser;

