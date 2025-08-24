import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/database';

// GET /api/teams - Get all teams
export async function GET(request: NextRequest) {
  try {
    const result = await query(`
      SELECT t.*, u.email as captain_email, p.full_name as captain_name
      FROM teams t
      LEFT JOIN users u ON t.captain_id = u.id
      LEFT JOIN profiles p ON t.captain_id = p.id
      ORDER BY t.created_at DESC
    `);

    return NextResponse.json({ teams: result.rows });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/teams - Create a new team
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const { name, contactEmail, contactPhone, city, state } = await request.json();

    // Validate required fields
    if (!name || !contactEmail || !contactPhone || !city || !state) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create team
    const result = await query(
      `INSERT INTO teams (name, captain_id, contact_email, contact_phone, city, state) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, decoded.userId, contactEmail, contactPhone, city, state]
    );

    return NextResponse.json({ team: result.rows[0] });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


