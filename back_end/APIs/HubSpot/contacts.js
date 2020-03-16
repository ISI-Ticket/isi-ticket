const findByEmail = { 
    method: 'GET',
    url: 'https://api.hubapi.com/contacts/v1/contact/email/',
    qs: { hapikey: '36377dfd-2e67-4289-b531-a259c8a0aa5a' }
}

exports.findByEmail = findByEmail;

