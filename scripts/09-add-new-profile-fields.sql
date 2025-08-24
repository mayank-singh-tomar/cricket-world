-- Add new columns to profiles table
-- This migration adds team_name, date_of_birth, gender, and nationality columns

-- Add date_of_birth column
ALTER TABLE profiles ADD COLUMN date_of_birth DATE;

-- Add gender column with check constraint
ALTER TABLE profiles ADD COLUMN gender VARCHAR(10);
ALTER TABLE profiles ADD CONSTRAINT profiles_gender_check 
    CHECK (gender IN ('Male', 'Female', 'Other'));

-- Add nationality column with default value
ALTER TABLE profiles ADD COLUMN nationality VARCHAR(50) DEFAULT 'Indian';

-- Add team_name column
ALTER TABLE profiles ADD COLUMN team_name VARCHAR(255);

-- Create indexes for better performance
CREATE INDEX idx_profiles_team_name ON profiles(team_name);
CREATE INDEX idx_profiles_gender ON profiles(gender);
CREATE INDEX idx_profiles_nationality ON profiles(nationality);

-- Update existing records to have default values
UPDATE profiles SET 
    nationality = COALESCE(nationality, 'Indian'),
    gender = COALESCE(gender, 'Male')
WHERE nationality IS NULL OR gender IS NULL;
