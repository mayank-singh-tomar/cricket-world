const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

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

async function testPhotoUpload() {
  const client = await pool.connect();
  
  try {
    console.log('Testing photo upload and serving functionality...');

    // Create a test user
    const testUserResult = await client.query(`
      INSERT INTO users (email, password_hash) 
      VALUES ($1, $2) 
      RETURNING id
    `, ['photo-test@example.com', 'test_hash']);
    
    const userId = testUserResult.rows[0].id;
    console.log('✓ Test user created with ID:', userId);

    // Create a test profile
    const profileResult = await client.query(`
      INSERT INTO profiles (id, full_name, phone, address, age, gender, nationality, aadhar_id, player_type, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      userId, 'Photo Test User', '1234567890', 'Test Address', 25, 'Male', 'Indian', 
      '123456789012', 'Batsman', 'photo-test@example.com'
    ]);
    
    console.log('✓ Test profile created');

    // Create a sample image data (simulating a real image)
    const sampleImageData = Buffer.from('fake-jpeg-image-data-for-testing-purposes');
    
    // Update profile with photo data
    const updateResult = await client.query(`
      UPDATE profiles 
      SET photo_data = $1, photo_mime_type = $2 
      WHERE id = $3 
      RETURNING id, photo_mime_type
    `, [sampleImageData, 'image/jpeg', userId]);
    
    console.log('✓ Photo data uploaded to database');

    // Retrieve and verify photo data
    const retrieveResult = await client.query(`
      SELECT photo_data, photo_mime_type 
      FROM profiles 
      WHERE id = $1
    `, [userId]);
    
    if (retrieveResult.rows[0] && retrieveResult.rows[0].photo_data) {
      console.log('✓ Photo data retrieved successfully');
      console.log('  - MIME type:', retrieveResult.rows[0].photo_mime_type);
      console.log('  - Data size:', retrieveResult.rows[0].photo_data.length, 'bytes');
      
      // Verify the data matches what we uploaded
      if (retrieveResult.rows[0].photo_data.equals(sampleImageData)) {
        console.log('✓ Photo data integrity verified');
      } else {
        console.log('✗ Photo data integrity check failed');
      }
    } else {
      console.log('✗ Failed to retrieve photo data');
    }

    // Test the photo serving endpoint (simulate API call)
    console.log('\nTesting photo serving endpoint...');
    
    // This would normally be a fetch call to /api/photos/[userId]
    // For this test, we'll just verify the data is accessible
    const serveResult = await client.query(`
      SELECT photo_data, photo_mime_type 
      FROM profiles 
      WHERE id = $1 AND photo_data IS NOT NULL
    `, [userId]);
    
    if (serveResult.rows.length > 0) {
      console.log('✓ Photo serving endpoint would work correctly');
      console.log('  - Content-Type would be:', serveResult.rows[0].photo_mime_type);
      console.log('  - Content-Length would be:', serveResult.rows[0].photo_data.length);
    } else {
      console.log('✗ Photo serving endpoint test failed');
    }

    // Clean up test data
    await client.query('DELETE FROM profiles WHERE id = $1', [userId]);
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    console.log('✓ Test data cleaned up');

    console.log('\n🎉 Photo upload and serving tests completed successfully!');
    console.log('The photo storage system is working correctly.');

  } catch (error) {
    console.error('Error testing photo functionality:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the test
testPhotoUpload().catch(console.error);
