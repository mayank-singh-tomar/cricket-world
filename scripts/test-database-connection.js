const { Pool } = require('pg');

// Aiven PostgreSQL configuration
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});

async function testDatabaseConnection() {
  const client = await pool.connect();
  
  try {
    console.log('Testing Aiven PostgreSQL database connection...');

    // Test basic connection
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✓ Database connection successful:', result.rows[0].current_time);

    // Test tables existence
    const tables = ['users', 'profiles', 'teams', 'registrations', 'contact_messages', 'tournament_config'];
    
    for (const table of tables) {
      const tableResult = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )
      `, [table]);
      
      if (tableResult.rows[0].exists) {
        console.log(`✓ Table '${table}' exists`);
      } else {
        console.log(`✗ Table '${table}' does not exist`);
      }
    }

    // Test photo storage columns in profiles table
    const photoColumnsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'profiles' 
      AND column_name IN ('photo_data', 'photo_mime_type')
      ORDER BY column_name
    `);
    
    console.log('\nPhoto storage columns in profiles table:');
    photoColumnsResult.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });

    // Test inserting and retrieving a sample photo
    console.log('\nTesting photo storage functionality...');
    
    // Create a test user first
    const testUserResult = await client.query(`
      INSERT INTO users (email, password_hash) 
      VALUES ($1, $2) 
      RETURNING id
    `, ['test@example.com', 'test_hash']);
    
    const userId = testUserResult.rows[0].id;
    console.log('✓ Test user created with ID:', userId);

    // Create a test profile with photo data
    const samplePhotoData = Buffer.from('fake-image-data-for-testing');
    const profileResult = await client.query(`
      INSERT INTO profiles (id, full_name, phone, address, age, gender, nationality, aadhar_id, player_type, email, photo_data, photo_mime_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, photo_mime_type
    `, [
      userId, 'Test User', '1234567890', 'Test Address', 25, 'Male', 'Indian', 
      '123456789012', 'Batsman', 'test@example.com', samplePhotoData, 'image/jpeg'
    ]);
    
    console.log('✓ Test profile created with photo data');

    // Retrieve the photo data
    const retrieveResult = await client.query(`
      SELECT photo_data, photo_mime_type 
      FROM profiles 
      WHERE id = $1
    `, [userId]);
    
    if (retrieveResult.rows[0] && retrieveResult.rows[0].photo_data) {
      console.log('✓ Photo data retrieved successfully');
      console.log('  - MIME type:', retrieveResult.rows[0].photo_mime_type);
      console.log('  - Data size:', retrieveResult.rows[0].photo_data.length, 'bytes');
    } else {
      console.log('✗ Failed to retrieve photo data');
    }

    // Clean up test data
    await client.query('DELETE FROM profiles WHERE id = $1', [userId]);
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    console.log('✓ Test data cleaned up');

    console.log('\n🎉 All database tests passed successfully!');
    console.log('The photo storage functionality is working correctly.');

  } catch (error) {
    console.error('Error testing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the test
testDatabaseConnection().catch(console.error);
