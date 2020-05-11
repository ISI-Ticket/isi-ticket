const request = require('request');
const moloniAuth = require('../../requests/moloni/moloniLogin');
const costumerOpt = require('../../options/moloni/costumerOpt');

const insertCostumer = (body) => {
    moloniAuth.auth().then(token => {
        const options = costumerOpt.insertCostumerOpt(body, token);
        console.log(options)
        request(options, function (error, response, body) {
            if (error) {
                console.log(error)
            }
        });
    })
}

module.exports.insertCostumer = insertCostumer;