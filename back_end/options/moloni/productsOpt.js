const getProductByName = (token, product) => {
    let options = {
        method: 'POST',
        url: `https://api.moloni.pt/v1/products/getByName/?access_token=${token}&json=true`,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(product)
    }
    return options;
}

const product = productName => {
    let data = {
        company_id: 128348,
        name: productName
    }

    return data;
}

exports.getProductByName = getProductByName;
exports.product = product;