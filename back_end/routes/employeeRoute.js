var connection = require('../config/connection');
const express = require('express');
const router = express.Router();
const validateTicketDB = require('../dbQueries/validateTicketDB');


router.post('/validate', (req,res) =>{
  validateTicketDB.getStatus(req.body.saleID, res);
})

module.exports = router;

