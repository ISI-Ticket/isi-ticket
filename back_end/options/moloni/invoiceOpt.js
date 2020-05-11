const company_id = 128348;

const insertInvoiceOpt = (token, body) =>{
    let invoice = invoiceInfo();
    let options = {
        method: 'POST',
        url: `https://api.moloni.pt/v1/invoiceReceipts/insert/?access_token=${token}&json=true`,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(invoice)
    }
    return options;
}

function invoiceInfo(){

    let finalDate = getDate();
    let info = {
        company_id : company_id,
        date : finalDate,
        expiration_date : finalDate,
        document_set_id : 272221,
        customer_id : 27409360,
        exchange_currency_id : 0,
        exchange_rate: 0,
        status : 0,
        products : ""
    }

    let products = [];
    let product = {
        product_id : 49840733,
        name : "Senha Simples",
        summary : "Prato principal e água - sem sobremesa",
        qty : 1,
        price : 2.05,
        exemption_reason : "M20",
        payment_method_id : 870978,
        date : finalDate,
        value : 13.6792
    }
    products.push(product);
    info.products = products;
    return info;
}

function getDate(){
    let date = new Date();
    let day = date.getDate();
    day = parseInt(day);
    let monthJS = date.getMonth();
    let month = parseInt(monthJS) + 1
    let year = date.getFullYear();
    let lengthMonth = Math.log(month) * Math.LOG10E + 1 | 0;
    let lengthDay = Math.log(day) * Math.LOG10E + 1 | 0;
    if(lengthMonth == 1){
        month = `0${month}`
    }else month = month.toString();

    if(lengthDay == 1){
        day = `0${day}`
    }else day = day.toString();
    
    let finalDate = `${year}-${month}-${day}`;
    return finalDate;
}

module.exports.insertInvoiceOpt = insertInvoiceOpt;