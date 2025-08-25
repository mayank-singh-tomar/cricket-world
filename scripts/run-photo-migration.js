const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cricket_tournament',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function runPhotoMigration() {
  try {
    console.log('Running migration: Add photo storage columns...');
    const sql = fs.readFileSync('./scripts/10-add-photo-storage-columns.sql', 'utf8');
    await pool.query(sql);
    console.log('Photo storage migration completed successfully!');
  } catch (error) {
    console.error('Photo storage migration failed:', error);
  } finally {
    await pool.end();
  }
}

runPhotoMigration();



