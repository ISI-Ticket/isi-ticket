require('dotenv').config();
const credentials = {
    username : process.env.moloni_username,
    password : process.env.moloni_password
}

module.exports = credentials;