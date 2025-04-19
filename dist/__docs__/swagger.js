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
    host: 'localhost:3000',
    schemes: ['http'],
};
const outputFile = './__docs__/swagger-output.json';
const endpointsFiles = ['./src/app/createApp.ts'];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
