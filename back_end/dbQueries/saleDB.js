const connection = require('../imp_info/connection');


const insert = (clientID, date, items, reference) =>{
    let sql = 'INSERT INTO Sale (date, quantity, ticketID, clientID, reference) VALUES ?'
    let records = prepareEntry(items, clientID, date, reference);
    console.log(records);
    var query = connection.query(sql, [records], function(err, result) {
        console.log(err);
    });
}


const select = (clientID, res) =>{
    let sql = "SELECT date, quantity, ticketID, clientID, reference FROM Sale WHERE quantity != 0 and clientID = ?"
    var query = connection.query(sql, parseInt(clientID), function (error, results, fields) {
            let rows = JSON.parse(JSON.stringify(results))
            res.send(prepareResponse(rows));
      });
      console.log(query.sql);
}

function prepareResponse(rows){
    let data = [];
    for(row of rows){
        let ticket = {
            ticketID : row.ticketID,
            ticketName : '',
            description : '',
            quantity : row.quantity,
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
    //console.log(data);
    return data;
}
function prepareEntry(items, clientID, date, reference){
    let records = []
    for(item of items){
        let sale = [];
        sale.push(date);
        sale.push(item.quantity);
        ticketID = parseInt(item.sku);
        sale.push(ticketID);
        sale.push(parseInt(clientID));
        sale.push(reference);
        records.push(sale);
    }
    return records;
}

exports.insert = insert;
exports.select = select;