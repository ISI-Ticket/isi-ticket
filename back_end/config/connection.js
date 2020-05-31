var mysql = require('mysql');
//require('dotenv').config();

var connection = mysql.createConnection({
    host     : process.env.db_host,
    user     : process.env.db_user,
    password : process.env.db_password,
    database : process.env.db_database
  });

  connection.connect();
  module.exports = connection;