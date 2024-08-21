import express from 'express'
import { executeQuery } from '../database-setup.js'

const router = express.Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 *       400:
 *         descriptions: Error response
 */
router.get('/', function (req, res) {
    executeQuery('SELECT * FROM authors', [], res);
  })

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An author
 */
router.get('/:id', function (req, res) {
    const authorId = req.params.id;
    const query = 'SELECT * FROM authors WHERE au_id = ?';
    executeQuery(query, [authorId], res);
});

/**
 * 
 */
router.post('/', function (req, res) {
    const {au_id, au_lname, au_fname, phone, address, city, state, zip, contract} = req.body;
    const query = `INSERT INTO authors (au_id, au_lname, au_fname, phone, address, city, state, zip, contract) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    executeQuery(query,  [au_id, au_lname, au_fname, phone, address, city, state, zip, contract], res);

});

/**
 * 
 */
router.put('/:au_id', function (req, res) {
    const au_id = req.params.au_id;
    const { au_lname, au_fname, phone, address, city, state, zip, contract } = req.body;
    const query = `UPDATE authors SET au_lname = ?, au_fname = ?, phone = ?, address = ?, city = ?, 
                   state = ?, zip = ?, contract = ? WHERE au_id = ?`;
    executeQuery(query, [au_lname, au_fname, phone, address, city, state, zip, contract, au_id], res);
});


/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted
 */
router.delete('/:id', function (req, res) {
    const authorId = req.params.id;
    const query = `DELETE FROM authors WHERE au_id = ?`;
    executeQuery(query, [authorId], res)
});




export default router;