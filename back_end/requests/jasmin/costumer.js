const request = require('request');
const costumerOpt = require('../../options/jasmin/costumerOpt');
const jasminLogin = require('./jasminLogin');
const clientDB = require('../../dbQueries/clientDB')

const find = (nif) => {
    return new Promise((resolve, reject) => {
        jasminLogin.auth().then((token) => {
            let options = costumerOpt.getCostumer(nif, token);
            let costumer;
            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong")
                else {
                    
                    if (response.statusCode === 200) {
                        costumer = JSON.parse(body);
                        console.log(costumer);
                        resolve(costumer);
                    } else resolve(null);
                    
                }
            });
        })
    })
}

/*const createCostumer = (userInfo) => {
    return new Promise((resolve, reject) => {
        jasminLogin.auth().then((token) => {
            clientDB.getLastId()
                .then(index => {
                    index += 1;
                    let partyKey = index.toString();
                    let user = costumerOpt.info(userInfo.firstname, userInfo.lastname, userInfo.nif, userInfo.phone, userInfo.email, userInfo.address, userInfo.zip, userInfo.city, partyKey);
                    let options = costumerOpt.createCustomer(user, token);
                    clientDB.insert(index, userInfo.firstname, userInfo.lastname, userInfo.email);
                    request(options, function (error, response, body) {
                        if (error) reject("Oops something went wrong");
                        else resolve(partyKey);
                    });
                });
        });
    });
}*/

const create = (userInfo, partyKey) => {
    return new Promise((resolve, reject) => {
        jasminLogin.auth().then((token) => {
            let user = costumerOpt.info(userInfo.firstname, userInfo.lastname, userInfo.nif, userInfo.phone, userInfo.email, userInfo.address, userInfo.zip, userInfo.city, partyKey);
            let options = costumerOpt.createCustomer(user, token);
            clientDB.insert(partyKey, userInfo.firstname, userInfo.lastname, userInfo.email);
            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong");
                else resolve(partyKey);
            });

        });
    });
}


exports.find = find;
exports.create = create;