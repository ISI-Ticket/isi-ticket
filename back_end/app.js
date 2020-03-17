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

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.post('/signin', (req,res)=>{
        
        
        console.log(req.body);
        let data = {
            exists : true,
            email : req.body.email,
            firstname : "",
            lastname : "",
            phone : "",
            address : "",
            city : "",
            zip : ""
        }
        let options =  contacts.findByEmail;
        options.url += req.body.email + "/profile";
        var json
        request(options, function (error, response, body) {
            
            json = JSON.parse(body);
            if(json.status === "error"){
                data.exists = false;
                res.send(data);
            }else {
                data.firstname = json.properties.firstname.value;
                data.lastname = json.properties.lastname.value;
                data.phone = json.properties.phone.value;
                data.address = json.properties.address.value;
                data.city = json.properties.city.value;
                data.zip = json.properties.zip.value;
                res.send(data);
            };
        });
      
});


app.post('/teste', (req,res) => {
    console.log(req.body);
    res.send(req.body);
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