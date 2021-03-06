const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:5500']
const corsOptions = {
  origin: '*'/*function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }*/
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/jasmin', require('./routes/jasmin'));
app.use('/user', require('./routes/userRoute.js'));
app.use('/employee', require('./routes/employeeRoute.js'));
app.use('/paypal', require('./routes/paypal.js'));
app.use('/paypalV2', require('./routes/paypalV2.js'));
app.use('/test', require('./routes/testRoute'));
app.use('/moloni', require('./routes/moloniTeste'));
app.use('/admin', require('./routes/adminRoute'));

app.get('/', (req, res) => {
  res.send("Hello from isi-ticket-api!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Running on port: " + PORT));