/**
 * Simplest express server example
 *  - Make sure you have a MySQL db setup.
 */

import express from 'express'
import mysql from  'mysql'

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'spyro123',
    database: 'pubs'
});

app.get('/', (req, res) => {
    res.json('Hello World');
});

app.get('/authors', (req, res) => {
    const userId = req.query.id;
    const query = `SELECT * FROM authors WHERE id = '${userId}'`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});