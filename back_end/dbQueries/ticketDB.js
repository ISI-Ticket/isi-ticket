const connection = require('../config/connection');

const select = (userEmail, res) =>{
    let sql = "SELECT date, ticketID, clientID, validated FROM Sale WHERE clientID IN (SELECT clientID FROM Client WHERE email = ?)"
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
            ticketID : row.ticketID,
            ticketName : '',
            description : '',
            validated : row.validated,
            date : row.date,
            invoiceID : row.invoiceID
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

exports.select = select;