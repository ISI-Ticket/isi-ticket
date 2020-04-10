const credentials = require('../../imp_info/jasmin_login.js');
const options = {
    url: 'https://identity.primaverabss.com/core/connect/token',
    method : 'POST',
    form: {
        client_id : credentials.client_id,
        client_secret : credentials.secret,
        grant_type: 'client_credentials',
        scope: 'application'
        
      }
}

module.exports = options;