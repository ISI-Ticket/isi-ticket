const request = require('request');
const costumerOpt = require('../../api_options/jasmin/costumerOpt')
const findCostumer = (nif, token) =>{
    console.log(token);
    let options = costumerOpt.getCostumer(nif,token);
    console.log(options)
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        json = JSON.parse(body);
        console.log(json);
    });
}

exports.findCostumer = findCostumer;