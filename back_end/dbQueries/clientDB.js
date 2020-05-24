const connection = require('../config/connection');


const insert = (clientID, firstname, lastname, email) =>{
    let date = new Date();
    let day = date.getDate();
    let monthJS = date.getMonth();
    let month = (parseInt(monthJS) + 1).toString()
    let year = date.getFullYear();
    let finalDate = `${year}-${month}-${day}`;
    let sql = 'INSERT INTO Client (clientID, firstname, lastname, email, created_at) VALUES (?)'
    let records = [clientID, firstname, lastname, email, finalDate];

    connection.query(sql, [records], function(err, result) {
        if(err) {
            console.log(err);
        }
    });
}

const getLastId = () => {
    let sql = 'SELECT MAX(clientId) as lastId FROM Client';
    
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(new Error(err));
            } else {
                if(result[0].lastId) {
                    resolve(result[0].lastId);
                } else resolve(1); 
            }
        });
    });
}

const monthlyClients = (res) => {
    let sql = 'SELECT clientID, created_at from Client'
    connection.query(sql, function(err, result) {
        if(err) console.log(err);
        
        let rows = JSON.parse(JSON.stringify(result))
        console.log(rows);
        let montlyClients = montlyClientsPayload(rows)
        res.send(montlyClients);
    });
}

const montlyClientsPayload = (results) =>{
    let montlyClients = {
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0,
        5 : 0,
        6 : 0,
        7 : 0,
        8 : 0,
        9 : 0,
        10 : 0,
        11 : 0,
        12 : 0
    }

    for(client of results){
        for(let i = 0; i <= 12; i++){
            let month = client.created_at;
            month = month.substring(5,7);
            month = parseInt(month);
            if(month == i){
                montlyClients[i] += 1;
                
            }
        }
    }
    return montlyClients;

}

exports.insert = insert;
exports.getLastId = getLastId;
exports.monthlyClients = monthlyClients;
