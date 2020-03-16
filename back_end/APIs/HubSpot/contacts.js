const findByEmail = { 
    method: 'GET',
    url: 'https://api.hubapi.com/contacts/v1/contact/email/',
    qs: { hapikey: '36377dfd-2e67-4289-b531-a259c8a0aa5a' }
}

const createContact = 
    { method: 'POST',
    url: 'https://api.hubapi.com/contacts/v1/contact/',
    qs: { hapikey: '36377dfd-2e67-4289-b531-a259c8a0aa5a' },
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
exports.createContact = createContact;

