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

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Setting up Aiven PostgreSQL database...');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Users table created');

    // Create profiles table with photo storage
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        age INTEGER NOT NULL,
        date_of_birth DATE,
        gender VARCHAR(10) NOT NULL,
        nationality VARCHAR(100) NOT NULL,
        team_name VARCHAR(255),
        aadhar_id VARCHAR(12) UNIQUE NOT NULL,
        player_type VARCHAR(50) NOT NULL,
        photo_url VARCHAR(500),
        photo_data BYTEA,
        photo_mime_type VARCHAR(100),
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Profiles table created with photo storage');

    // Create teams table
    await client.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        captain_id UUID REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Teams table created');

    // Create registrations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
        payment_status VARCHAR(20) DEFAULT 'pending',
        payment_amount DECIMAL(10,2),
        payment_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Registrations table created');

    // Create contact_messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Contact messages table created');

    // Create tournament_config table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tournament_config (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        registration_fee DECIMAL(10,2) DEFAULT 500.00,
        max_players_per_team INTEGER DEFAULT 15,
        registration_deadline TIMESTAMP WITH TIME ZONE,
        tournament_start_date TIMESTAMP WITH TIME ZONE,
        tournament_end_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Tournament config table created');

    // Insert default tournament config if not exists
    await client.query(`
      INSERT INTO tournament_config (registration_fee, max_players_per_team, registration_deadline)
      VALUES (500.00, 15, NOW() + INTERVAL '30 days')
      ON CONFLICT DO NOTHING
    `);
    console.log('✓ Default tournament config inserted');

    // Create indexes for better performance
    await client.query('CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_profiles_aadhar_id ON profiles(aadhar_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_profiles_photo_mime_type ON profiles(photo_mime_type)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_registrations_team_id ON registrations(team_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at)');
    
    console.log('✓ Database indexes created');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('All tables are ready for the cricket tournament application.');

  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the setup
setupDatabase().catch(console.error);
