const credentials = require('../../imp_info/jasmin_org')
const getInvoicesOpt = (token) =>{
   let options = { 
        method: 'GET',
        url: `https://my.jasminsoftware.com/api/${credentials.tenant}/${credentials.org}/sales/orders`,
        headers: { 
        'Authorization' : `${token}`,
        'Content-Type' : 'application/json'
        }
    }
    return options;
}

const createInvoiceOpt = (token, invoice) =>{
    let options = { 
        method: 'POST',
        url: `https://my.jasminsoftware.com/api/${credentials.tenant}/${credentials.org}/billing/invoices`,
        headers: { 
        'Authorization' : `${token}`,
        'Content-Type' : 'application/json'
        },
        body : JSON.stringify(invoice)
    }
    return options;
}

const info = (buyerCustomerParty, items) =>{
    
    let data = {
        buyerCustomerParty: buyerCustomerParty,
        serie: "2020",
        paymentTerm: "00",
        documentLines: []
    };
    for(let item of items){
        let amount = (item.price/1.23).toFixed(2);
        let a = {
            salesItem : item.sku,
            quantity : item.quantity,
            unitPrice: {amount: amount},
            warehouse: "01"
        }
        data.documentLines.push(a);
    }
    return data;
}


exports.info = info;
exports.getInvoicesOpt = getInvoicesOpt;
exports.createInvoiceOpt = createInvoiceOpt;