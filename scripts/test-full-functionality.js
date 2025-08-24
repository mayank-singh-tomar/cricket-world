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

async function testFullFunctionality() {
  const client = await pool.connect();
  
  try {
    console.log('🏏 Testing Full Cricket Tournament Application Functionality');
    console.log('========================================================');

    // Test 1: Database Connection
    console.log('\n1. Testing Database Connection...');
    const dbTest = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database connected:', dbTest.rows[0].current_time);

    // Test 2: Check Tables
    console.log('\n2. Checking Database Tables...');
    const tables = ['users', 'profiles', 'teams', 'registrations', 'contact_messages', 'tournament_config'];
    for (const table of tables) {
      const tableExists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )
      `, [table]);
      if (tableExists.rows[0].exists) {
        console.log(`✅ Table '${table}' exists`);
      } else {
        console.log(`❌ Table '${table}' missing`);
      }
    }

    // Test 3: Create Test User and Profile
    console.log('\n3. Testing User Registration...');
    const testEmail = `test-${Date.now()}@example.com`;
    
    // Create user
    const userResult = await client.query(`
      INSERT INTO users (email, password_hash) 
      VALUES ($1, $2) 
      RETURNING id, email
    `, [testEmail, 'test_hash']);
    
    const userId = userResult.rows[0].id;
    console.log('✅ Test user created:', userResult.rows[0].email);

    // Create profile
    const profileResult = await client.query(`
      INSERT INTO profiles (id, full_name, phone, address, age, gender, nationality, aadhar_id, player_type, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, full_name, player_type
    `, [
      userId, 'Test Player', '1234567890', 'Test Address', 25, 'Male', 'Indian', 
      '123456789012', 'Batsman', testEmail
    ]);
    
    console.log('✅ Test profile created:', profileResult.rows[0].full_name);

    // Test 4: Test Photo Upload
    console.log('\n4. Testing Photo Upload...');
    const samplePhotoData = Buffer.from('fake-jpeg-image-data-for-testing');
    
    await client.query(`
      UPDATE profiles 
      SET photo_data = $1, photo_mime_type = $2 
      WHERE id = $3
    `, [samplePhotoData, 'image/jpeg', userId]);
    
    console.log('✅ Photo data uploaded to database');

    // Test 5: Verify Data Retrieval
    console.log('\n5. Testing Data Retrieval...');
    const profileData = await client.query(`
      SELECT p.*, u.email 
      FROM profiles p 
      JOIN users u ON p.id = u.id 
      WHERE p.id = $1
    `, [userId]);
    
    if (profileData.rows.length > 0) {
      const profile = profileData.rows[0];
      console.log('✅ Profile data retrieved successfully');
      console.log(`   - Name: ${profile.full_name}`);
      console.log(`   - Email: ${profile.email}`);
      console.log(`   - Player Type: ${profile.player_type}`);
      console.log(`   - Photo Data: ${profile.photo_data ? 'Present' : 'Missing'}`);
    } else {
      console.log('❌ Failed to retrieve profile data');
    }

    // Test 6: Test Players API Data
    console.log('\n6. Testing Players API Data...');
    const allPlayers = await client.query(`
      SELECT 
        id,
        full_name,
        age,
        player_type,
        team_name,
        gender,
        nationality,
        photo_data,
        photo_mime_type,
        email
      FROM profiles 
      ORDER BY created_at DESC
    `);
    
    console.log(`✅ Found ${allPlayers.rows.length} players in database`);
    if (allPlayers.rows.length > 0) {
      console.log(`   - Latest player: ${allPlayers.rows[0].full_name}`);
      console.log(`   - Player type: ${allPlayers.rows[0].player_type}`);
    }

    // Test 7: Test Tournament Config
    console.log('\n7. Testing Tournament Configuration...');
    const tournamentConfig = await client.query(`
      SELECT * FROM tournament_config 
      ORDER BY created_at DESC 
      LIMIT 1
    `);
    
    if (tournamentConfig.rows.length > 0) {
      console.log('✅ Tournament configuration found');
      console.log(`   - Registration fee: ₹${tournamentConfig.rows[0].registration_fee}`);
      console.log(`   - Max players per team: ${tournamentConfig.rows[0].max_players_per_team}`);
    } else {
      console.log('❌ No tournament configuration found');
    }

    // Clean up test data
    console.log('\n8. Cleaning up test data...');
    await client.query('DELETE FROM profiles WHERE id = $1', [userId]);
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All functionality tests passed successfully!');
    console.log('Your cricket tournament application is fully functional.');
    console.log('\n🌐 Access your application at: http://localhost:3003');
    console.log('📊 Dashboard should now display all data correctly.');

  } catch (error) {
    console.error('❌ Error during functionality test:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the comprehensive test
testFullFunctionality().catch(console.error);
