const request = require('request');
const moloniAuth = require('../../requests/moloni/moloniLogin');
const costumerOpt = require('../../options/moloni/costumerOpt');
const clientDB = require('../../dbQueries/clientDB')

const insert = (body) => {
    return new Promise((resolve, reject) => {
    moloniAuth.auth().then(token => {
        clientDB.getLastId().then(index => {
            index += 1;
            const options = costumerOpt.insertCostumerOpt(body, index, token);
            console.log(options)
            request(options, function (error, response, body) {
                if (error) {
                    reject(error)
                    console.log(error)
                }else{
                    json = JSON.parse(body);
                    console.log(json)
                    resolve(json.customer_id);

                }
            });
        })
    })
})
}

module.exports.insert = insert;