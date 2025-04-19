import swaggerAutogen from 'swagger-autogen';

const doc = {
  openapi: '3.0.0',  
  info: {
    title: 'My API',
    description: 'Auto-generated Swagger docs for internal use',
    version: '1.0.0',  
  },
  host: 'brokers-production.up.railway.app',
  basePath: '/',  
  schemes: ['https'],
  paths: {}, 
  components: {
    securitySchemes: {
      
    },
  },
};

const outputFile = './__docs__/swagger-output.json';  
const endpointsFiles = ['../src/routes/events.ts'];    


swaggerAutogen()(outputFile, endpointsFiles, doc);
