const credentials = require('../../config/moloni_login');
const info = require('../../config/api_keys');

const auth = { 
    method: 'GET',
    url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=${info.moloniKey.devID}&client_secret=${info.moloniKey.clientSecret}&username=${credentials.username}&password=${credentials.password}`
}

const refreshAcessToken = {
    method: 'GET',
    url: `https://api.moloni.pt/v1/grant/?grant_type=refresh_token&client_id=${info.moloniKey.devID}&client_secret=${info.moloniKey.clientSecret}&refresh_token=`
}

exports.auth = auth;
exports.refreshAcessToken = refreshAcessToken;