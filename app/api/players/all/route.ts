import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Fetch all profiles (players) from the database
    const result = await query(`
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
        email,
        phone,
        created_at
      FROM profiles 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      players: result.rows
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


