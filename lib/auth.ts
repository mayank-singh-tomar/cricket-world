import { query } from './database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface User {
  id: string
  email: string
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string
  phone: string
  address: string
  age: number
  date_of_birth: string | null
  gender: string
  nationality: string
  team_name: string | null
  aadhar_id: string
  player_type: string
  photo_url: string | null
  photo_data: Buffer | null
  photo_mime_type: string | null
  email: string
  created_at: string
  updated_at: string
}

export async function createUser(email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 12)
  const result = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  )
  return result.rows[0]
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0] || null
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateJWT(userId: string): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key'
  return jwt.sign({ userId }, secret, { expiresIn: '7d' })
}

export function verifyJWT(token: string): { userId: string } | null {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    return jwt.verify(token, secret) as { userId: string }
  } catch (error) {
    return null
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const result = await query('SELECT * FROM profiles WHERE id = $1', [userId])
  return result.rows[0] || null
}

export async function createProfile(profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<Profile> {
  const result = await query(
    `INSERT INTO profiles (id, full_name, phone, address, age, date_of_birth, gender, nationality, team_name, aadhar_id, player_type, photo_url, photo_data, photo_mime_type, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
    [
      profileData.id,
      profileData.full_name,
      profileData.phone,
      profileData.address,
      profileData.age,
      profileData.date_of_birth,
      profileData.gender,
      profileData.nationality,
      profileData.team_name,
      profileData.aadhar_id,
      profileData.player_type,
      profileData.photo_url,
      profileData.photo_data,
      profileData.photo_mime_type,
      profileData.email,
    ]
  )
  return result.rows[0]
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
  const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
  const values = Object.values(updates).filter((_, index) => fields[index])
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
  const queryText = `UPDATE profiles SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`
  
  const result = await query(queryText, [userId, ...values])
  return result.rows[0]
}

// Alias for verifyJWT to maintain compatibility
export function verifyToken(token: string): { userId: string } | null {
  return verifyJWT(token)
}

// Alias for getProfile to maintain compatibility
export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  return getProfile(userId)
}

// Function to get user with password hash for login
export async function getUserWithPassword(email: string): Promise<User | null> {
  const result = await query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0] || null
}

// Function to compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return verifyPassword(password, hashedPassword)
}

// Function to generate token (alias for generateJWT)
export function generateToken(userId: string): string {
  return generateJWT(userId)
}
