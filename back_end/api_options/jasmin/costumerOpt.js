const jasminOrg = require('../../imp_info/jasmin_org')
const getCostumer = (nif, token) => {
    let options = {
    method : 'GET',
    url: `https://my.jasminsoftware.com/api/${jasminOrg.tenant}/${jasminOrg.org}/salesCore/customerParties/getCustomerByCompanyTaxId/${nif}?companyTaxId=${nif}`,
    headers: {'Authorization' : `${token}`, 'Content-Type' : 'application/json'}
    }
    return options;
}

const createCustomer = (user, token) =>{
    let options = {
        method : 'POST',
        url : `https://my.jasminsoftware.com/api/${jasminOrg.tenant}/${jasminOrg.org}/salesCore/customerParties`,
        headers: {'Authorization' : `${token}`, 'Content-Type' : 'application/json'},
        body : JSON.stringify(user)
    }
    return options; 
}


const info = (firstname,lastname, nif, mobile, electronicMail, streetName, postalZone, cityName, partyKey) => {
    let user = {
        name: `${firstname} ${lastname}`,
        isExternallyManaged: false,
        currency: "EUR",
        isPerson: true,
        country: "PT",
        companyTaxID : `${nif}`,
        mobile: `${mobile}`,
        electronicMail : `${electronicMail}`,
        streetName : `${streetName}`,
        postalZone : `${postalZone}`,
        cityName : `${cityName}`,
        partyKey : `${partyKey}`
    }
    return user;
}

exports.getCostumer = getCostumer;
exports.createCustomer = createCustomer;
exports.info = info;
