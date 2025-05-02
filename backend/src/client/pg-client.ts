import { Client } from 'pg';
import { config } from 'dotenv';
config(); 

export const pg_client = new Client({
  connectionString: process.env.PG_CONNECTION_STRING
})