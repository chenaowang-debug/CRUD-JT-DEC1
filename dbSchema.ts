import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.SUPABASE_USERNAME,
  host: process.env.SUPABASE_HOST,
  database: process.env.SUPABASE_DATABASE,
  password: process.env.SUPABASE_PW,
  port: 6543,
});

const createSchemaSQL = `
  CREATE SCHEMA IF NOT EXISTS job_applications;

  CREATE TABLE IF NOT EXISTS job_applications.jobs (
      id SERIAL PRIMARY KEY,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      job_title VARCHAR(255),
      date_applied VARCHAR(255),
      apply_method VARCHAR(255),
      cover_letter VARCHAR(255),
      double_down VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
  );
`;

const createSchema = async () => {
  try {
    await pool.query(createSchemaSQL);
    console.log('Schema and table has been created in SUPABASE!');
  } catch (error) {
    console.error('Error creating Schema', error);
  }
};

export { pool, createSchema };
