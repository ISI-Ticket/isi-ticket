const connection = require('../config/connection');


const insert = (clientID, date, items, invoiceID) => {
    let sql = 'INSERT INTO Sale (date, status, ticketID, clientID, invoiceID) VALUES ?'
    let records = prepareEntry(items, clientID, date, invoiceID);

    connection.query(sql, [records], function (err, result) {
        if (err) {
            console.log(err);
        }
    });
}


const select = (email, res) => {
    
    let sql = 'SELECT saleID, date, ticketID, clientID, invoiceID FROM Sale WHERE status != false and clientID IN (SELECT clientID FROM Client WHERE email = ?)';
    var query = connection.query(sql, email, function (error, results, fields) {
        let rows = JSON.parse(JSON.stringify(results))
        res.send(prepareResponse(rows));
    });
    console.log(query.sql)
}

const getAll = () =>{
    return new Promise((resolve, reject) => {
        let sql = 'SELECT saleID, date, validated, ticketID, invalid FROM Sale';
        var query = connection.query(sql, function (error, results, fields) {
            let rows = JSON.parse(JSON.stringify(results))
            resolve(rows);
        });
        console.log(query.sql)

    })

}

const getClientAffluence = (res) => {
        let sql = 'SELECT saleID, date FROM Sale';
        var query = connection.query(sql, function (error, results, fields) {
        let rows = JSON.parse(JSON.stringify(results))
        res.send(getClientAffluencePayload(rows));
    });
    console.log(query.sql)
}

const getClientAffluencePayload = (rows) =>{
    let clientAffluence = {
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15:0
    }

    for(sale of rows){
        for(let i = 10; i <=15; i++){
            let hour = sale.date;
            hour = hour.substring(11, 13);
            hour = parseInt(hour);
            hour += 1;
            if(hour == i){
                clientAffluence[hour] += 1;
            }
        }
    }
    return clientAffluence;
}


const countValid = (sales) =>{
    let tickets = {
        valid : 0,
        invalid : 0
    }
    for(sale of sales){
        if(sale.validated != null){
            tickets.valid += 1;
            tickets.invalid += sale.invalid;
        }
    }
    return tickets;
}
const countTickets =  (sales) => {
    let tickets = {
        simples : 0,
        completa : 0,
        rampaB : 0,
        grill : 0,
        pack : 0
    }

    for(sale of sales){
        switch(sale.ticketID){
            case 1 :
                tickets.simples += 1; 
                break;
            case 2:
                tickets.completa += 1; 
                break;
            case 3:
                tickets.grill += 1; 
                break;
            case 4:
                tickets.rampaB += 1; 
                break;
            case 5:
                tickets.pack += 1; 
                break;
        }
    }
    return tickets;
}
function prepareResponse(rows) {
    let data = [];
    for (row of rows) {
        let ticket = {
            saleID: row.saleID,
            ticketID: row.ticketID,
            ticketName: '',
            description: '',
            date: row.date,
            invoiceID: row.invoiceID
        }
        switch (row.ticketID) {
            case 1:
                ticket.ticketName = "Senha simples";
                ticket.description = "Refeição e bebida (água)";
                data.push(ticket);
                break;
            case 2:
                ticket.ticketName = "Senha completa";
                ticket.description = "Refeição, bebida (água ou sumo) e sobremesa";
                data.push(ticket);
                break;
            case 3:
                ticket.ticketName = "Senha grill";
                ticket.description = "Descrição por definir";
                data.push(ticket);
                break;
            case 4:
                ticket.ticketName = "Senha rampa B";
                ticket.description = "Descrição por definir";
                data.push(ticket);
                break;
            case 5:
                ticket.ticketName = "Pack senhas";
                ticket.description = "Descrição por definir";
                data.push(ticket);
                break;
        }
    }
    return data;
}

function prepareEntry(items, clientID, date, invoiceID) {
    let records = []
    for (item of items) {
        for (let i = 0; i < item.quantity; i++) {
            let sale = [];
            sale.push(date);
            sale.push(true);
            ticketID = parseInt(item.sku);
            sale.push(ticketID);
            sale.push(parseInt(clientID));
            sale.push(invoiceID);
            records.push(sale);
        }
    }
    return records;
}

exports.insert = insert;
exports.select = select;
exports.getAll = getAll;
exports.countTickets = countTickets;
exports.countValid = countValid;
exports.getClientAffluence = getClientAffluence;