const authOpt = require('../../options/jasmin/authOpt');
const request = require('request');

const auth = () =>{
    return new Promise((resolve,reject) =>{
        let json;
        request(authOpt, function (error, response, body) {
            if (error) throw new Error(error);
            json = JSON.parse(body);
            token = "Bearer " + json.access_token;
            console.log(body);
            if(!error){
                resolve(token);
            }else{
                reject("Something went wrong!");
            }
        });
    })

}

exports.auth = auth;
