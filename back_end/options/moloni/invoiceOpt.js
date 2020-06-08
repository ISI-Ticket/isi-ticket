const company_id = 128348;

const insertInvoiceOpt = (token, items, costumerID, total) =>{
    let invoice = invoiceInfo(items, costumerID, total);
    let options = {
        method: 'POST',
        url: `https://api.moloni.pt/v1/invoiceReceipts/insert/?access_token=${token}&json=true`,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(invoice)
    }
    return options;
}

function invoiceInfo(items, costumerID, total){

    let finalDate = getDate();
    payments = [];
    let payment = {
        payment_method_id : 870978,
        date : finalDate,
        value : parseFloat(total)
    }
    payments.push(payment)
    let info = {
        company_id : company_id,
        date : finalDate,
        expiration_date : finalDate,
        document_set_id : 272221,
        customer_id : costumerID,
        exchange_currency_id : 0,
        exchange_rate: 0,
        status : 0,
        products : "",
        payments : payments
        
    }

    let products = getProducts(items);
    info.products = products;
    return info;
}


function getProducts(items, total){
    let products = [];
    for(item of items){
        let product = {
        }
        switch(item.sku){
            case '001' :
                product.product_id = 49840733;
                product.name = "Senha Simples";
                product.summary =  "Prato principal e água - sem sobremesa";
                product.qty = item.quantity;
                product.price = 2.05;
                product.exemption_reason = "M20";
                products.push(product);
                break; 
            case '002' :
                product.product_id  = 49840763;
                product.name = "Senha Completa";
                product.summary =  "Prato principal e água ou sumo - com sobremesa";
                product.qty = item.quantity;
                product.price = 2.75;
                product.exemption_reason = "M20";
                products.push(product);
                break;
            case '003' :
                product.product_id =  49840759;
                product.name = "Senha Grill";
                product.summary =  "Descricao por definir";
                product.qty = item.quantity;
                product.price = 5.50;
                product.exemption_reason = "M20";
                products.push(product);
                break;
            case '004' : 
                product.product_id = 49840738;
                product.name = "Senha Rampa B";
                product.summary =  "Prato principal da Rampa B agua ou sumo e sobremesa";
                product.qty = item.quantity;
                product.price = 4.05;
                product.exemption_reason = "M20";
                products.push(product);
                break;
            case '005':
                product.product_id = 49840747;
                product.name = "Pack de senhas";
                product.summary =  "Pack de 10 senhas completas";
                product.qty = item.quantity;
                product.price = 26.50;
                product.exemption_reason = "M20";
                products.push(product);
                break;
            case '006':
                product.product_id = 55348628;
                product.name = "Pack de senhas";
                product.summary =  "Pack de 10 senhas simples";
                product.qty = item.quantity;
                product.price = 26.50;
                product.exemption_reason = "M20";
                products.push(product);
                break;
        }

    }
    return products;
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