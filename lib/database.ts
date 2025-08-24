import { Pool, PoolClient } from 'pg';

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'your_db_user',
  host: process.env.DB_HOST || 'your_db_host',
  database: process.env.DB_NAME || 'your_db_name',
  password: process.env.DB_PASSWORD || 'your_db_password',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool };

// Helper function to get a client from the pool
export async function getClient(): Promise<PoolClient> {
  return await pool.connect();
}

// Helper function to execute a query
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

// Helper function to execute a transaction
export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
