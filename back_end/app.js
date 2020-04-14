const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/jasmin', require('./routes/jasmin'));
app.use('/user', require('./routes/userRoute.js'));
app.use('/moloni', require('./routes/moloni.js'));
app.use('/employee', require('./routes/validateTicket.js'));
app.use('/paypal', require('./routes/paypal.js'));
app.use('/test', require('./routes/testRoute'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log("Running on port: " + PORT));