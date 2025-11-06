-- Student Council Election Database Schema
-- Run this script in your Supabase SQL Editor

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    erp_number TEXT NOT NULL UNIQUE,
    president TEXT NOT NULL,
    vice_president TEXT NOT NULL,
    secretary TEXT NOT NULL,
    treasurer TEXT NOT NULL,
    management_head TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on erp_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_erp_number ON votes(erp_number);

-- Enable Row Level Security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to check if an ERP exists (for duplicate check)
CREATE POLICY "Allow public to read ERP existence"
ON votes
FOR SELECT
USING (true);

-- Create policy to prevent duplicate voting (only allow insert if ERP doesn't exist)
CREATE POLICY "Prevent duplicate voting"
ON votes
FOR INSERT
WITH CHECK (
    NOT EXISTS (
        SELECT 1 FROM votes WHERE erp_number = NEW.erp_number
    )
);

-- Grant necessary permissions
GRANT SELECT, INSERT ON votes TO anon;
GRANT SELECT, INSERT ON votes TO authenticated;
