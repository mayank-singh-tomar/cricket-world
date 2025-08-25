-- Fix Aadhar ID constraint to make it optional
-- Drop the unique constraint if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_aadhar_id_key' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE profiles DROP CONSTRAINT profiles_aadhar_id_key;
    END IF;
END $$;

-- Make sure the column allows NULL values
ALTER TABLE profiles ALTER COLUMN aadhar_id DROP NOT NULL;



