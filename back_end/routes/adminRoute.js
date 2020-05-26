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

router.get('/getRegularClients', (req,res) =>{
  saleDB.getRegularClients().then(r => res.send(r));    
})

router.get('/getDailyEarnings', (req,res) =>{
  saleDB.getDailyEarnings(res); 
})

router.get('/getMonthlyEarnings', (req,res) =>{
  saleDB.getMonthlyEarnings(res); 
})

router.get('/getYearlyEarnings', (req,res) =>{
  saleDB.getYearlyEarnings(res); 
})
module.exports = router;