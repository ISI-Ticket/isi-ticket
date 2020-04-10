const credentials = require('../../imp_info/jasmin_org')
const getInvoices = { 
    method: 'GET',
    url: `https://my.jasminsoftware.com/api/${credentials.tenant}/${credentials.org}/sales/orders`,
    headers: { 
       'Authorization' : '',
       'Content-Type' : 'application/json'
    }
}

exports.getInvoices = getInvoices;