import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/database';

// GET /api/registrations - Get registrations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    let sql = `
      SELECT r.*, t.name as team_name, t.captain_id
      FROM registrations r
      JOIN teams t ON r.team_id = t.id
    `;
    let params: any[] = [];

    if (teamId) {
      sql += ' WHERE r.team_id = $1';
      params.push(teamId);
    }

    sql += ' ORDER BY r.created_at DESC';

    const result = await query(sql, params);

    return NextResponse.json({ registrations: result.rows });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/registrations - Create a new registration
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

    const { teamId, tournamentCategory } = await request.json();

    // Validate required fields
    if (!teamId || !tournamentCategory) {
      return NextResponse.json(
        { error: 'Team ID and tournament category are required' },
        { status: 400 }
      );
    }

    // Verify that the user is the captain of this team
    const teamResult = await query(
      'SELECT captain_id FROM teams WHERE id = $1',
      [teamId]
    );

    if (teamResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    if (teamResult.rows[0].captain_id !== decoded.userId) {
      return NextResponse.json(
        { error: 'Unauthorized to register this team' },
        { status: 403 }
      );
    }

    // Calculate registration fee based on category
    const registrationFee = tournamentCategory === "Open" ? 5000 : 
                           tournamentCategory === "Corporate" ? 4000 : 3000;

    // Create registration
    const result = await query(
      `INSERT INTO registrations (team_id, tournament_category, registration_fee, payment_status) 
       VALUES ($1, $2, $3, 'pending') RETURNING *`,
      [teamId, tournamentCategory, registrationFee]
    );

    return NextResponse.json({ registration: result.rows[0] });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



