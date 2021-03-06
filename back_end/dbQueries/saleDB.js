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

const getSalesByMonth = (month)=> {

        let sql = 'SELECT COUNT(clientID) AS numSales, clientID FROM Sale where year(date) = ? and month(date) = ? GROUP BY clientID;';
        let date = new Date();
        let year = parseInt(date.getFullYear());
        let params = [year, month]
        return new Promise((resolve, reject) => {
            var query = connection.query(sql,params, function (error, results, fields) {
            let rows = JSON.parse(JSON.stringify(results))
            resolve(rows);
            });
        });


}

const getRegularClients = () =>{
    console.log("fui chamado")
    let sales = {};
    return new Promise((resolve, reject) => {
        let date = new Date();
        let year = parseInt(date.getFullYear());
        for(let month = 1; month<=12; month++){
            this.getSalesByMonth(month).then((rows) => {
                let regularClients = 0;
                let nonRegularClients = 0;
                for(sale of rows){
                    if(sale.numSales >= 6){
                        regularClients += 1;
                    }else nonRegularClients += 1;
                }
                let entry = {regularClients, nonRegularClients};
                sales[month] = entry;
                if(month == 12) resolve(sales);
            })
             
        }
    });
}

const getYearlyEarnings = (res) => {
    let sql = 'SELECT SUM(price) AS total  FROM Ticket INNER JOIN Sale ON Ticket.ticketID = Sale.ticketID WHERE year(date) = ?';
    let date = new Date();
    let year = parseInt(date.getFullYear());
    var query = connection.query(sql,year, function (error, results, fields) {
        let rows = JSON.parse(JSON.stringify(results))
        res.send(rows[0])
    });

}

const getMonthlyEarnings = (res) => {
    let sql = 'SELECT SUM(price) AS total  FROM Ticket INNER JOIN Sale ON Ticket.ticketID = Sale.ticketID WHERE year(date) = ? and month(date) = ?';
    let date = new Date();
    let monthJS = date.getMonth();
    let month = parseInt(monthJS) + 1
    let year = parseInt(date.getFullYear())
    let params = [year, month]
    var query = connection.query(sql,params, function (error, results, fields) {
        let rows = JSON.parse(JSON.stringify(results))
        res.send(rows[0])
    });

}

const getDailyEarnings = (res) => {
    let sql = 'SELECT SUM(price) AS total  FROM Ticket INNER JOIN Sale ON Ticket.ticketID = Sale.ticketID WHERE year(date) = ? and month(date) = ? and day(date) = ?';
    let date = new Date();
    let day = date.getDate();
    let monthJS = date.getMonth();
    let month = parseInt(monthJS) + 1
    let year = parseInt(date.getFullYear());
    let params = [year, month,day]
    var query = connection.query(sql,params, function (error, results, fields) {
        let rows = JSON.parse(JSON.stringify(results))
        res.send(rows[0])
    });

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
                ticket.ticketName = "Senha normal";
                ticket.description = "Refeição, bebida (água ou sumo) e sobremesa";
                data.push(ticket);
                break;
            case 3:
                ticket.ticketName = "Senha grill";
                ticket.description = "Menu composto por: pão, sopa, prato, bebida (água ou sumo) e sobremesa";
                data.push(ticket);
                break;
            case 4:
                ticket.ticketName = "Senha rampa B";
                ticket.description = "Refeição composta por: Pão, sopa, prato, sobremesa, água/sumo";
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
            if(parseInt(item.sku) == 5){
                for(let a = 0; a < (item.quantity * 10); a++){
                    let sale = [];
                    sale.push(date);
                    sale.push(true);
                    ticketID = 2;
                    sale.push(ticketID);
                    sale.push(parseInt(clientID));
                    sale.push(invoiceID);
                    records.push(sale);
                }
            }else if(parseInt(item.sku) == 6){
                for(let a = 0; a < (item.quantity * 10); a++){
                    let sale = [];
                    sale.push(date);
                    sale.push(true);
                    ticketID = 1;
                    sale.push(ticketID);
                    sale.push(parseInt(clientID));
                    sale.push(invoiceID);
                    records.push(sale);
                }

            }else{
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
    }
    return records;
}

exports.insert = insert;
exports.select = select;
exports.getAll = getAll;
exports.countTickets = countTickets;
exports.countValid = countValid;
exports.getClientAffluence = getClientAffluence;
exports.getSalesByMonth = getSalesByMonth
exports.getRegularClients = getRegularClients
exports.getDailyEarnings = getDailyEarnings
exports.getMonthlyEarnings = getMonthlyEarnings
exports.getYearlyEarnings = getYearlyEarnings
