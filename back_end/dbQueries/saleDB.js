const connection = require('../config/connection');


const insert = (clientID, date, items, reference) =>{
    let sql = 'INSERT INTO Sale (date, status, ticketID, clientID, invoiceID) VALUES ?'
    let records = prepareEntry(items, clientID, date, parseInt(reference));
    console.log(records);
    var query = connection.query(sql, [records], function(err, result) {
        console.log(err);
    });
    console.log(query.sql)
}


const select = (userEmail, res) =>{
    let sql = "SELECT saleID, date, ticketID, clientID FROM Sale WHERE status != false and clientID IN (SELECT clientID FROM Client WHERE email = ?)"
    var query = connection.query(sql, userEmail, function (error, results, fields) {
            let rows = JSON.parse(JSON.stringify(results))
            res.send(prepareResponse(rows));
      });
      console.log(query.sql);
}

function prepareResponse(rows){
    let data = [];
    for(row of rows){
        let ticket = {
            saleID : row.saleID,
            ticketID : row.ticketID,
            ticketName : '',
            description : '',
            date : row.date,
            reference : row.reference
        }
        switch(row.ticketID){
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
          }
    }
    return data;
}
function prepareEntry(items, clientID, date, reference){
    let records = []
    for(item of items){
        for(let i = 0; i<item.quantity; i++){
            let sale = [];
            sale.push(date);
            sale.push(true);
            ticketID = parseInt(item.sku);
            sale.push(ticketID);
            sale.push(parseInt(clientID));
            sale.push(reference);
            records.push(sale);
        }
    }
    return records;
}

exports.insert = insert;
exports.select = select;