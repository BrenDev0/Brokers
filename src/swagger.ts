import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Brokers',
    description: 'Endpoints',
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

const outputFile = '../swagger.json';  
const endpointsFiles = ['./src/routes/events.ts'];    


swaggerAutogen()(outputFile, endpointsFiles, doc);
