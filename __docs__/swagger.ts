// __docs__/swagger.ts

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Auto-generated Swagger docs for internal use',
  },
  host: 'brokers-production.up.railway.app',
  schemes: ['https'],
};

const outputFile = './__docs__/swagger-output.json'; 
const endpointsFiles = ['../src/routes/events.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
