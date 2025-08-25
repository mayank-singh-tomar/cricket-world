import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/database';

// GET /api/players - Get players by team ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'SELECT * FROM players WHERE team_id = $1 ORDER BY created_at',
      [teamId]
    );

    return NextResponse.json({ players: result.rows });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/players - Create players for a team
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

    const { teamId, players } = await request.json();

    // Validate required fields
    if (!teamId || !players || !Array.isArray(players)) {
      return NextResponse.json(
        { error: 'Team ID and players array are required' },
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
        { error: 'Unauthorized to add players to this team' },
        { status: 403 }
      );
    }

    // Insert players
    const playersData = players.map((player: any) => [
      teamId,
      player.name,
      parseInt(player.age),
      player.position || null,
      player.experienceYears ? parseInt(player.experienceYears) : 0,
    ]);

    const values = playersData.map((_, index) => {
      const offset = index * 5;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`;
    }).join(', ');

    const flatValues = playersData.flat();

    const result = await query(
      `INSERT INTO players (team_id, name, age, position, experience_years) 
       VALUES ${values} RETURNING *`,
      flatValues
    );

    return NextResponse.json({ players: result.rows });
  } catch (error) {
    console.error('Error creating players:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



