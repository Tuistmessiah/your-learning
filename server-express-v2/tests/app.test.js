import request from 'supertest';
import app from '../app.js';

describe('GET /greet', () => {
    it('should respond with a message "Greetings, traveler!"', async () => {
        const response = await request(app).get('/greet');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Greetings, traveler!');
    });
});
