const connection = require('../config/connection');


const getStatus = (saleID, res) =>{
    saleID = parseInt(saleID);
    let params = [saleID]
    let sql = "SELECT status, ticketID from Sale WHERE saleID = ?"
    var query = connection.query(sql, params, function(err, results) {
        console.log(err);
        let row = JSON.parse(JSON.stringify(results[0]))
        console.log(row);
        checkStatus(row.status,row.ticketID,saleID, res)
    });
    console.log(query.sql);
}

function validateTicket(saleID,ticketID, res){
    let date = new Date();
    let day = date.getDate();
    let monthJS = date.getMonth();
    let month = (parseInt(monthJS) + 1).toString()
    let year = date.getFullYear();
    let fullDate = `${year}-${month}-${day}`;
    let data = {status : true, msg : ''}
    data.msg = checkTicket(ticketID) + ' validada com sucesso!';
    let status = false;
    let params = [status, fullDate, saleID];
    let sql = "UPDATE Sale SET status = ?, validated = ? WHERE saleID = ?"
    let query = connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        res.send(data)
      });
    console.log(query.sql)
}

function checkStatus(status,ticketID, saleID, res){

    let data = {status : false,msg : ''}
    if(status == false)res.send(data);
    else validateTicket(saleID,ticketID, res);
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

exports.getStatus = getStatus;