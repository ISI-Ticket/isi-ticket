const insertCostumerOpt = (user, token) =>{
    let costumer = costumerOpt(user);
    let options = {
        method: 'POST',
        url: `https://api.moloni.pt/v1/customers/insert/?access_token=${token}&json=true`,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(costumer)
    }
    return options;
}

function costumerOpt(client){
    let user = {
        company_id : 128348,
        vat : client.nif,
        number : 1,
        name : `${client.firstname} ${client.lastname}`,
        language_id : 1,
        address: client.address,
        zip_code: client.zip,
        city: client.city,
        country_id : 1,
        email: client.email,
        phone: client.phone,
        salesman_id : 0,
        maturity_date_id : 0,
        payment_day : 0,
        discount: 0,
        credit_limit: 0,
        payment_method_id : 0,
        delivery_method_id: 0
    }
    return user;
}

exports.insertCostumerOpt = insertCostumerOpt;