-- Add photo storage columns to profiles table
-- This migration adds photo_data and photo_mime_type columns for storing images in database

-- Add photo_data column for storing image binary data
ALTER TABLE profiles ADD COLUMN photo_data BYTEA;

-- Add photo_mime_type column for storing image MIME type
ALTER TABLE profiles ADD COLUMN photo_mime_type VARCHAR(100);

-- Update existing photo_url column to be more specific
ALTER TABLE profiles ALTER COLUMN photo_url TYPE VARCHAR(500);

-- Create index for photo_mime_type for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_photo_mime_type ON profiles(photo_mime_type);



