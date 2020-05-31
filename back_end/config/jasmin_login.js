require('dotenv').config();

const credentials = {
    client_id : process.env.jasmin_clientID,
    secret : process.env.jasmin_secret
}

module.exports = credentials;