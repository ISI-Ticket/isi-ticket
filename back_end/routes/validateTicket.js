var connection = require('../imp_info/connection');
const express = require('express');
const router = express.Router();

router.get('/validate/:salesID/:ticketID', (req,res) =>{
    console.log(req.params);
    connection.query('UPDATE Sales SET status = ? WHERE saleID = ? and ticketID = ?', [0, req.params.salesID, req.params.ticketID], function (error, results, fields) {
        if (error) throw error;
        console.log(results);
      });
})

module.exports = router;

