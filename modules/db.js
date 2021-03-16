const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"));

const mysql = require("mysql");

const pool = mysql.createPool(config.db);
 console.log('Connection pool created.');

pool.on('acquire', function (connection) {
    // console.log(`Connection ${connection.threadId} acquired`);
});

pool.on('enqueue', function () {
    // console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    // console.log(`Connection ${connection.threadId} released`);
});

const getConn = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
}

module.exports = getConn;