const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'bush254748',
    database: 'vacCenter'
});

module.exports = connection;