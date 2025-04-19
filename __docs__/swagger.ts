import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Brokers',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: 'https://brokers-production.up.railway.app',
      },
    ],
  },
  apis: ['./__docs__/*.ts'],
});
