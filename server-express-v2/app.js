"use strict"

// DON'T FORGET
// - add "type": "module" to package.json to use imports/exports
// - use VSCode extension Thunder Client OR Postman to test endpoints
// - please check if credentials in mysql.createConnection are correct and, ideally, use environment variables
// - DO NOT FORGET to create a .env file with your credentials like this:
/**
 * HOST=localhost
 * USER=root
 * PASSWORD=YOUR_PASSWORD
 * DATABASE=pubs
 * DB_PORT=3306
 */

import express from 'express'
import { executeQuery } from './database-setup.js'
import { setupSwagger } from './swagger.js'

import authorRouter from './routers/author-router.js'

// Express App
const app = express()
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// --- Middleware

app.use((req, res, next) => {
    console.log('--- Incoming Request --- ' + "Time: " + Date.now());
    console.log('Method: ' + req.method + ' | URL: ' + req.originalUrl);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Query Params:', JSON.stringify(req.query, null, 2));
    console.log('------------------------');
    next();
});

// --- Routing

app.get('/', function (req, res) {
  res.send('This API is live!')
})

// app.get('/greet', (req, res) => {
//     res.status(200).json({ message: 'Greetings, traveler!' });
// });

// Example of Try/Catch
app.get('/greet', (req, res) => {
    try {
        // Assume we're expecting a query parameter 'id'
        const { name } = req.query;

        if (!name) {
            throw new Error('Missing "name" query parameter');
        }

        // Simulate fetching data (this could be from a database or another source)
        const data = {
            id,
            name: 'Sample Data',
            description: 'Hello ' + name
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.use('/authors', authorRouter)

/**
 * Get Authors and their Titles
 */
app.get('/authors-titles', function (req, res) {
    const query = `
        SELECT authors.au_id, authors.au_fname, authors.au_lname, titles.title
        FROM authors
        JOIN titleauthor ON authors.au_id = titleauthor.au_id
        JOIN titles ON titles.title_id = titleauthor.title_id;
    `;
    executeQuery(query, [], res)
});

// 
/**
 * Get filtered titles
 * @example /titles?pub_id=1389
 */
app.get('/titles', function (req, res) {
    const pub_id = req.query.pub_id;
    const type = req.query.type;
    const query = `SELECT * FROM titles WHERE pub_id=${pub_id} AND type='${type}'`;
    executeQuery(query, [], res)
})

export default app;