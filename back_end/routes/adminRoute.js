var connection = require('../config/connection');
const express = require('express');
const router = express.Router();
const clientDB = require('../dbQueries/clientDB');
const saleDB = require('../dbQueries/saleDB')

router.get('/monthlyClients', (req,res) =>{
    clientDB.monthlyClients(res);
})

router.get('/getClientAffluence' , (req, res) =>{
  saleDB.getClientAffluence(res);
})
module.exports = router;