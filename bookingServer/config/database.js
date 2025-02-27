const mysql = require('mysql2');
require("dotenv").config();
require("colors");
const util = require('util');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'appointment_db',
});

pool.getConnection = util.promisify(pool.getConnection);

pool.getConnection()
    .then((connection) => {
        console.log("Connected to the MySQL server".underline.cyan);
        connection.release();
    })
    .catch((error) => {
        console.error("Error connecting: " + error.stack);
    });

function getQueryPromise() {
    return pool
        .getConnection()
        .then((connection) => {
            const queryPromise = util.promisify(connection.query).bind(connection);
            connection.release();
            return queryPromise;
        })
        .catch((error) => {
            throw error;
        });
}

module.exports = { getQueryPromise };

// query that need to create table

// CREATE TABLE appointments (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     phone VARCHAR(20) NOT NULL,
//     date DATE NOT NULL,
//     time VARCHAR(5) NOT NULL UNIQUE
// );