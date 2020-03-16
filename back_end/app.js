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
        let options =  contacts.findByEmail;
        options.url += req.body.email + "/profile";
        var json
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            json = JSON.parse(body);
            if(json.status === "error"){
                res.send(false);
            }else res.send(true);
        });
});


app.post('/signup', (req,res)=>{

    let options = contacts.createContact;
    options.body.properties[0].value = req.body.email;
    options.body.properties[1].value = req.body.firstname;
    options.body.properties[2].value = req.body.lastname;
    options.body.properties[3].value = req.body.phone;
    options.body.properties[4].value = req.body.address;
    options.body.properties[5].value = req.body.city;
    options.body.properties[6].value = req.body.zip;
    for(let property of options.body.properties){
        console.log(property.value);
    }
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });


});



const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log("Running on port: " + PORT));