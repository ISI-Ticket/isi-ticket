const request = require('request');
const authOpt = require('../../options/moloni/authOpt');

const auth = () => {
    return new Promise((resolve, reject) => {

        request(authOpt.auth, function (error, response, body) {
            if (error) {
                reject(new Error(error));
            } else {
                json = JSON.parse(body);
                resolve(json.access_token);
            }
        });
    })
}

exports.auth = auth;