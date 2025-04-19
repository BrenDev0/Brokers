// __docs__/swagger.ts

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Auto-generated Swagger docs for internal use',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './__docs__/swagger-output.json'; 
const endpointsFiles = ['./src/app/createApp.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
