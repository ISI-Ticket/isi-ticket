const connection = require('../imp_info/connection');


const getQuantity = (clientID, ticketID, reference, res) =>{
    let params = [parseInt(clientID), parseInt(ticketID), reference]
    let sql = "SELECT quantity from Sale WHERE clientID = ? and ticketID = ? and reference = ?"
    var query = connection.query(sql, params, function(err, results) {
        console.log(err);
        let row = JSON.parse(JSON.stringify(results[0]))
        console.log(row);
        checkQty(row.quantity,parseInt(clientID), parseInt(ticketID), reference, res)
    });
    console.log(query.sql);
}

function validateTicket(quantity, ticketID, clientID, reference, res){
    let data = {status : true, msg : ''}
    data.msg = checkTicket(ticketID) + ' validada com sucesso!';
    let newQty = quantity - 1;
    let params = [newQty, clientID, ticketID, reference];
    let sql = "UPDATE Sale SET quantity = ? WHERE clientID = ? and ticketID = ? and reference = ?"
    let query = connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        res.send(data)
      });
    console.log(query.sql)
}
function checkQty(quantity, clientID, ticketID, reference, res){

    let data = {status : false,msg : ''}
    if(quantity < 1)res.send(data);
    else validateTicket(quantity, ticketID, clientID, reference, res);
}


function checkTicket(ticketID){
    switch(ticketID){
      case 1:
        return "Senha simples";  
      case 2:
        return "Senha completa";
      case 3:
        return "Senha Grill";
      case 4:
        return "Senha Rampa B";       
    }
}

exports.getQuantity = getQuantity;