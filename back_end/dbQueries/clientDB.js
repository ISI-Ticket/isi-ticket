const connection = require('../config/connection');


const insert = (clientID, firstname, lastname, email) =>{
    let sql = 'INSERT INTO Client (clientID, firstname, lastname, email) VALUES (?)'
    let records = [clientID, firstname, lastname, email];
    console.log(records);
    var query = connection.query(sql, [records], function(err, result) {
        console.log(err);
    });
    console.log(query.sql);
}

exports.insert = insert;
