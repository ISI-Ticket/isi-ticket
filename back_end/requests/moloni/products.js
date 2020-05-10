const request = require('request');
const moloniAuth = require('../../requests/moloni/moloniLogin');
const productsOpt = require('../../options/moloni/productsOpt');

const getProductStock = (productName) => {
    return new Promise((resolve, reject) => {
        moloniAuth.auth().then(token => {
            const product = productsOpt.product(productName);
            const options = productsOpt.getProductByName(token, product);

            request(options, function (error, response, body) {
                if (error) {
                    reject(new Error(error));
                } else {
                    json = JSON.parse(body);
                    resolve(json[0].stock);
                }
            });
        })
    });
}

const setProductStock = () => {

}


exports.getProductStock = getProductStock;