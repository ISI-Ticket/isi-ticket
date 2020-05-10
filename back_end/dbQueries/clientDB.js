const connection = require('../config/connection');


const insert = (clientID, firstname, lastname, email) =>{
    let sql = 'INSERT INTO Client (clientID, firstname, lastname, email) VALUES (?)'
    let records = [clientID, firstname, lastname, email];

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

exports.insert = insert;
exports.getLastId = getLastId;
