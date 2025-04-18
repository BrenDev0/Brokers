"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
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
        securitySchemes: {},
    },
};
const outputFile = './swagger.json';
const endpointsFiles = ['./src/swagger/endpoints.ts'];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
