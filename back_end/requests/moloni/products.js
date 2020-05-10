const request = require('request');
const productsOpt = require('../../options/moloni/productsOpt');

const getProductStock = (token, productName) => {
    return new Promise((resolve, reject) => {

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

    });
}

const setProductStock = () => {
    
}


exports.getProductStock = getProductStock;