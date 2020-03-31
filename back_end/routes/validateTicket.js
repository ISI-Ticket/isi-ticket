var connection = require('../imp_info/connection');
const express = require('express');
const router = express.Router();

router.post('/validate', (req,res) =>{
    let query = connection.query('UPDATE Sales SET status = ? WHERE saleID = ? and ticketID = ?', [0, req.body.saleID, req.body.ticketID], function (error, results, fields) {
        if (error) throw error;
        console.log(query.sql);
        console.log(results.changedRows);
        let response = handleResponse(results.changedRows, req.body.ticketID);
        res.send(response);
      });
})

function handleResponse(rows, ticketID){
  let data, status;
    if(rows == 0 ){
      status = false;
      data = {status}
      return data;
    }else{
      status = true;
      let ticket = checkTicket(ticketID);
      let msg = ticket + ' validada com sucesso!';
      data = {
        status,
        ticket, 
        msg
      }
      return data;
    }

    
    

}

function checkTicket(ticketID){
  switch(ticketID){
    case '1':
      return "Senha simples";  
    case '2':
      return "Senha completa";
    case '3':
      return "Senha Grill";
    case '4':
      return "Senha Rampa B";       
  }

}
module.exports = router;

