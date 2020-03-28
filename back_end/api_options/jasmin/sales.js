const getInvoices = { 
    method: 'GET',
    url: 'https://my.jasminsoftware.com/api/233988/233988-0001/sales/orders',
    headers: { 
       'Authorization' : '',
       'Content-Type' : 'application/json'
    }
}

exports.getInvoices = getInvoices;