const request = require('request');
const costumerOpt = require('../../options/jasmin/costumerOpt');
const jasminLogin =require('./jasminLogin');
var index = 22;
const findCostumer = (nif) => {
    return new Promise((resolve, reject) =>{
        jasminLogin.auth().then((token) =>{
            let options = costumerOpt.getCostumer(nif,token);
            let costumer;
            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong")
                else{
                    costumer = JSON.parse(body);
                    resolve(costumer);
                }
            });
        })
    })
}
const createCostumer = (userInfo) =>{
    return new Promise((resolve, reject) =>{
        jasminLogin.auth().then((token) =>{
            index += 1;
            let partyKey = index.toString();
            let user = costumerOpt.info(userInfo.firstname, userInfo.lastname, userInfo.nif, userInfo.phone, userInfo.email, userInfo.address, userInfo.zip, userInfo.city, partyKey);
            let options = costumerOpt.createCustomer(user, token);
            request(options, function (error, response, body) {
                if (error) reject("Oops something went wrong");
                else resolve(partyKey);
            });
        });
    });
}


exports.findCostumer = findCostumer;
exports.createCostumer = createCostumer;