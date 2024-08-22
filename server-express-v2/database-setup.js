// database-setup.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let connection;

if (!connection) {
    connection = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        port: process.env.db_port
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database');
    });
}

export default connection;

export function executeQuery(query, params, res = null) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                if (res) {
                    res.status(500).send('Database query error\n');
                }
                return reject(error);
            }
            if (res) {
                res.status(200).json(results);
            } else {
                resolve(results);
            }
        });
    });
}
