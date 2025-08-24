-- Create profiles table
-- This table stores user profile information

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  address TEXT,
  age INTEGER CHECK (age >= 16 AND age <= 50),
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
  nationality VARCHAR(50) DEFAULT 'Indian',
  team_name VARCHAR(255),
  aadhar_id VARCHAR(12),
  player_type VARCHAR(50) CHECK (player_type IN ('Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper')),
  photo_url VARCHAR(500),
  photo_data BYTEA, -- Store image data as binary
  photo_mime_type VARCHAR(100), -- Store MIME type of the image
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_aadhar_id ON profiles(aadhar_id);
CREATE INDEX IF NOT EXISTS idx_profiles_player_type ON profiles(player_type);
CREATE INDEX IF NOT EXISTS idx_profiles_team_name ON profiles(team_name);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_nationality ON profiles(nationality);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_profiles_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_profiles_updated_at_column();
