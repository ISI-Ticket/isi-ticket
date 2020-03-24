const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/user', require('./routes/user.js'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log("Running on port: " + PORT));