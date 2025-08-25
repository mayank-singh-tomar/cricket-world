-- Create storage table for file management
CREATE TABLE IF NOT EXISTS storage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR(100),
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_bucket ON storage(bucket_name);
CREATE INDEX IF NOT EXISTS idx_storage_path ON storage(file_path);
CREATE INDEX IF NOT EXISTS idx_storage_user ON storage(uploaded_by);

-- Create unique constraint for file path
CREATE UNIQUE INDEX IF NOT EXISTS idx_storage_unique_path ON storage(bucket_name, file_path);



