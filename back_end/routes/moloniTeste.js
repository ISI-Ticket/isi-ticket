const express = require('express');
const router = express.Router();
const moloniInvoice = require('../requests/moloni/invoice')

router.post('/insertInvoice', (req, res) => {
    moloniInvoice.insert(req.body);
    res.send("teste");
});

module.exports = router;