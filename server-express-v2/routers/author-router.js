import express from 'express';
import AuthorsController from '../controllers/authors-controller.js';

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
    AuthorsController.getAllAuthors(res);
});

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
    AuthorsController.getAuthorById(authorId, res);
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Add a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Author added successfully
 *       500:
 *         description: Failed to add author
 */
router.post('/', function (req, res) {
    const authorData = req.body;
    AuthorsController.addAuthor(authorData, res);
});

/**
 * @swagger
 * /authors/{au_id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - name: au_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       500:
 *         description: Failed to update author
 */
router.put('/:au_id', function (req, res) {
    const authorId = req.params.au_id;
    const authorData = req.body;
    AuthorsController.updateAuthor(authorId, authorData, res);
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
 *         description: Author deleted successfully
 *       500:
 *         description: Failed to delete author
 */
router.delete('/:id', function (req, res) {
    const authorId = req.params.id;
    AuthorsController.deleteAuthor(authorId, res);
});

export default router;