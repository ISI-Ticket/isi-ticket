const jasminOrg = require('../../imp_info/jasmin_org')
const getCostumer = (nif, token) => {
    let options = {
    method : 'GET',
    url: `https://my.jasminsoftware.com/api/${jasminOrg.tenant}/${jasminOrg.org}/salesCore/customerParties/getCustomerByCompanyTaxId/${nif}?companyTaxId=${nif}`,
    headers: {'Authorization' : `${token}`, 'Content-Type' : 'application/json'}
    }
    return options;
}

exports.getCostumer = getCostumer;
