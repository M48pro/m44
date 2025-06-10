/*
  # Fix booking RLS policy for anonymous users

  1. Security Updates
    - Update RLS policy for bookings table to allow anonymous insertions
    - Ensure foreign key references work with anonymous users
    - Add proper policy for client creation by anonymous users

  2. Changes
    - Drop and recreate booking insert policy with proper conditions
    - Ensure anonymous users can reference clients they create
    - Update client policies to work with booking creation
*/

-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Anonymous users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anon to create new clients" ON clients;

-- Recreate client policy to allow anonymous users to create and reference clients
CREATE POLICY "Anonymous users can create clients"
  ON clients
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can read clients for booking"
  ON clients
  FOR SELECT
  TO anon
  USING (true);

-- Recreate booking policy with proper conditions
CREATE POLICY "Anonymous users can create bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Allow if client_id exists and is accessible
    (client_id IS NULL OR EXISTS (
      SELECT 1 FROM clients WHERE id = client_id
    ))
    AND
    -- Allow if yacht_id is null or references an available yacht
    (yacht_id IS NULL OR EXISTS (
      SELECT 1 FROM yachts WHERE id = yacht_id AND status IN ('available', 'active')
    ))
  );

-- Ensure anonymous users can read yachts for booking validation
CREATE POLICY IF NOT EXISTS "Anonymous users can read yachts for booking"
  ON yachts
  FOR SELECT
  TO anon
  USING (status IN ('available', 'active'));