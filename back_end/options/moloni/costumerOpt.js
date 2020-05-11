const company_id = 128348;
const insertCostumerOpt = (user, index, token) =>{
    let costumer = costumerOpt(user, index);
    let options = {
        method: 'POST',
        url: `https://api.moloni.pt/v1/customers/insert/?access_token=${token}&json=true`,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(costumer)
    }
    return options;
}

const getCostumerOpt = (token) => {
    let body = {
        company_id : company_id,
        number : 1
    }

    let options = {
        method: 'GET',
        url: `https://api.moloni.pt/v1/customers/getByNumber/?access_token=${token}&json=true`,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(body)
    }
    return options;
}

function costumerOpt(client, index){
    let user = {
        company_id : company_id,
        vat : client.nif,
        number : index,
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
exports.getCostumerOpt = getCostumerOpt;