"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const promise_1 = __importDefault(require("mysql2/promise"));
class Database {
    constructor(secretName) {
        this.initPromise = null;
        this.secretName = secretName;
        this.client = new client_secrets_manager_1.SecretsManagerClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    }
    static getInstance(secretName) {
        if (!Database.instance) {
            Database.instance = new Database(secretName);
        }
        return Database.instance;
    }
    getSecret() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: this.secretName });
                const data = yield this.client.send(command);
                if (data.SecretString) {
                    return JSON.parse(data.SecretString);
                }
                else if (data.SecretBinary) {
                    const buff = Buffer.from(data.SecretBinary);
                    return JSON.parse(buff.toString('ascii'));
                }
                else {
                    throw new Error('Secret is missing both SecretString and SecretBinary');
                }
            }
            catch (err) {
                console.error('Error retrieving secret:', err);
                throw err;
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initPromise !== null) {
                return this.initPromise;
            }
            if (this.pool) {
                return;
            }
            console.log('Initializing Database...');
            this.initPromise = (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const secret = yield this.getSecret();
                    const { username, password } = secret;
                    // Connect to the database
                    this.pool = promise_1.default.createPool({
                        host: process.env.DB_HOST,
                        user: username,
                        password: password,
                        database: process.env.DB,
                        port: 3306,
                        ssl: {
                            rejectUnauthorized: false,
                        }
                    });
                    console.log('Database connection established');
                }
                catch (err) {
                    console.error('Error initializing the app:', err);
                    throw err;
                }
                finally {
                    this.initPromise = null;
                }
            }))();
            return this.initPromise;
        });
    }
    getPool() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.pool) {
                yield this.init();
            }
            return this.pool;
        });
    }
}
const databaseInstance = Database.getInstance(process.env.AWS_SECRET_NAME || '');
exports.default = databaseInstance;
