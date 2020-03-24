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


const teste = require('./api_options/moloni/auth');
const request = require('request');

app.get('/teste', (req,res) => {
    let options = teste.auth;
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
    });
});

app.get('/teste2', (req,res) => {
    let options = teste.refreshAcessToken;
    options.url += 'teste';
    console.log(options);
    /*request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
    });*/
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log("Running on port: " + PORT));