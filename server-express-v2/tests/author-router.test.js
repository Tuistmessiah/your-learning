import request from 'supertest';
import app from '../app.js'; 
import connection, { executeQuery } from '../database-setup.js';

describe('POST /authors', () => {
    beforeEach(async () => {
        await executeQuery('DELETE FROM authors WHERE au_id = ?', ['123-45-6789']);
    });

    it('should create a new author and verify it in the database', async () => {
        const newAuthor = {
            au_id: '123-45-6789',
            au_lname: 'Doe',
            au_fname: 'John',
            phone: '123-456-7890',
            address: '123 Main St',
            city: 'Somewhere',
            state: 'CA',
            zip: '12345',
            contract: 1
        };

        const response = await request(app)
            .post('/authors')
            .send(newAuthor)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Author added successfully');

        const result = await executeQuery('SELECT * FROM authors WHERE au_id = ?', [newAuthor.au_id]);
        const contractValue = result[0].contract;
        const contract = Buffer.isBuffer(contractValue) ? contractValue[0] : contractValue;

        expect(result.length).toBe(1);
        expect(result[0].au_id).toBe(newAuthor.au_id);
        expect(result[0].au_lname).toBe(newAuthor.au_lname);
        expect(result[0].au_fname).toBe(newAuthor.au_fname);
        expect(result[0].phone).toBe(newAuthor.phone);
        expect(result[0].address).toBe(newAuthor.address);
        expect(result[0].city).toBe(newAuthor.city);
        expect(result[0].state).toBe(newAuthor.state);
        expect(result[0].zip).toBe(newAuthor.zip);
        expect(contract).toBe(newAuthor.contract);
    });

    // Close the MySQL connection after all tests
    afterAll(() => {
        connection.end();
    });
});
