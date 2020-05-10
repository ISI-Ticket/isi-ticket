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


const select = (clientID, res) => {
    let sql = 'SELECT saleID, date, ticketID, clientID, invoiceID FROM Sale WHERE status != false and clientID = ?';
    var query = connection.query(sql, parseInt(clientID), function (error, results, fields) {
        let rows = JSON.parse(JSON.stringify(results))
        res.send(prepareResponse(rows));
    });
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