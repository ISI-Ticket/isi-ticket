const express = require('express');
const request = require('request');
const contacts = require('./APIs/HubSpot/contacts');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Hello word');
});

app.post('/signin', (req,res)=>{

        console.log(req.body.email);
        var json
        contacts.findByEmail.url += req.body.email + "/profile";
        request(contacts.findByEmail, function (error, response, body) {
            if (error) throw new Error(error);
            json = JSON.parse(body);
            if(json.status === "error"){
                res.send(json);
            }else res.send(json.properties.firstname);

        });
        
});

//teste 123

app.get('/teste', (req,res) =>{
    contacts.findByEmail.url += 'bh@hubspot.com/profile';
    request(contacts.findByEmail, function (error, response, body) {
        
        if (error) throw new Error(error);
        var json = JSON.parse(body);
        res.send(json.properties.firstname);
        console.log(json.properties.firstname);
    });

});



const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log("Running on port: " + PORT));