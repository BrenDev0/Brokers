import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import mysql from 'mysql2/promise'

class Database {
  private secretName: string;
  private pool: any;
  private initPromise: Promise<void> | null = null;
  private client: SecretsManagerClient;
  private static instance: Database;

  constructor(secretName: string) {
    this.secretName = secretName;
    this.client = new SecretsManagerClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  public static getInstance(secretName: string): Database {
    if (!Database.instance) {
      Database.instance = new Database(secretName);
    }
    return Database.instance;
  }

  private async getSecret(): Promise<any> {
    try {
      const command = new GetSecretValueCommand({ SecretId: this.secretName });
      const data = await this.client.send(command);

      if (data.SecretString) {
        return JSON.parse(data.SecretString);
      } else if(data.SecretBinary) {
        const buff = Buffer.from(data.SecretBinary as Uint8Array);
        return JSON.parse(buff.toString('ascii'));
      } else {
        throw new Error('Secret is missing both SecretString and SecretBinary');
      }
    } catch (err) {
      console.error('Error retrieving secret:', err);
      throw err;
    }
  }

  public async init(): Promise<void> {
    if (this.initPromise !== null) {
      return this.initPromise;
    }

    if (this.pool) {
      return;
    }

    console.log('Initializing Database...');

    this.initPromise = (async () => {
      try {
        const secret = await this.getSecret();
        
        const { username, password } = secret;
        // Connect to the database
        this.pool = mysql.createPool({
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
      } catch (err) {
        console.error('Error initializing the app:', err);
        throw err;
      } finally {
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }

  public async getPool(): Promise<any> {
    if (!this.pool) {
      await this.init();
    }
    return this.pool;
  }
}

const databaseInstance = Database.getInstance(process.env.AWS_SECRET_NAME || '');

export default databaseInstance;
