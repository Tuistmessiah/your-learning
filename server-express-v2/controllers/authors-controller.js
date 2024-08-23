import { executeQuery } from '../database-setup.js';

class AuthorsController {
    async getAllAuthors(res) {
        try {
            const query = 'SELECT * FROM authors';
            const results = await executeQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve authors' });
        }
    }

    async getAuthorById(id, res) {
        try {
            const query = 'SELECT * FROM authors WHERE au_id = ?';
            const results = await executeQuery(query, [id]);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve author' });
        }
    }

    async addAuthor(authorData, res) {
        const { au_id, au_lname, au_fname, phone, address, city, state, zip, contract } = authorData;
        const query = `INSERT INTO authors (au_id, au_lname, au_fname, phone, address, city, state, zip, contract) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        try {
            await executeQuery(query, [au_id, au_lname, au_fname, phone, address, city, state, zip, contract]);
            res.status(200).json({ message: 'Author added successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to add author' });
        }
    }

    async updateAuthor(id, authorData, res) {
        const { au_lname, au_fname, phone, address, city, state, zip, contract } = authorData;
        const query = `UPDATE authors SET au_lname = ?, au_fname = ?, phone = ?, address = ?, city = ?, 
                       state = ?, zip = ?, contract = ? WHERE au_id = ?`;
        try {
            await executeQuery(query, [au_lname, au_fname, phone, address, city, state, zip, contract, id]);
            res.status(200).json({ message: 'Author updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update author' });
        }
    }

    async deleteAuthor(id, res) {
        const query = `DELETE FROM authors WHERE au_id = ?`;
        try {
            await executeQuery(query, [id]);
            res.status(200).json({ message: 'Author deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete author' });
        }
    }
}

export default new AuthorsController();