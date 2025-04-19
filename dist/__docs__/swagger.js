"use strict";
// __docs__/swagger.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
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
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
