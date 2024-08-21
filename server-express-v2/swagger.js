import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'API Documentation for your Node.js app',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Change this if your app runs on a different port
      },
    ],
  },
  apis: ['./authorRouter.js'], // Path to your route files for annotation
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
