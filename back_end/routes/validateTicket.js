var connection = require('../imp_info/connection');
const express = require('express');
const router = express.Router();
const validateTicketDB = require('../dbQueries/validateTicketDB');


router.post('/validate', (req,res) =>{
  validateTicketDB.getQuantity(req.body.clientID, req.body.ticketID, req.body.reference, res);
})

module.exports = router;

