const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cricket_tournament',
  password: process.env.DB_PASSWORD || '', // Empty password for local setup
  port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Read and execute SQL files in correct order
    const sqlFiles = [
      '02-create-users-table.sql',      // First create users table
      '03-create-profiles-table.sql',   // Then profiles table (references users)
      '01-create-tables.sql',           // Then other tables (references users)
      '04-create-storage-table.sql'     // Finally storage table
    ];

    for (const file of sqlFiles) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        console.log(`Executing ${file}...`);
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log(`✓ ${file} executed successfully`);
      } else {
        console.log(`⚠ ${file} not found, skipping...`);
      }
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
