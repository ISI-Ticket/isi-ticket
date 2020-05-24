var connection = require('../config/connection');
const express = require('express');
const router = express.Router();
const clientDB = require('../dbQueries/clientDB');

router.get('/monthlyClients', (req,res) =>{
    clientDB.monthlyClients(res);
  })

module.exports = router;