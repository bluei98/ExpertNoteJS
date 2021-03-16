const express = require('express');
const app = express();
const port = 8080;

const mysql = require('mysql');
const db = require('./modules/db');

app.get('/', (req, res) => {
    db((err, connection) => {
        connection.query("SHOW TABLES", (err, rows) => {
            connection.release(); // 연결세션 반환.
            if (err) throw err;
            return res.json({ data: rows });
        });
    });
});

app.listen(port, () => {
    console.log(`Express Server Started at http://127.0.0.1:${port}`);
});