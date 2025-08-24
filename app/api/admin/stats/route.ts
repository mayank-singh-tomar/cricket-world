import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Get total teams
    const teamsResult = await query('SELECT COUNT(*) as total FROM teams');
    const totalTeams = parseInt(teamsResult.rows[0].total);

    // Get confirmed teams (with completed payments)
    const confirmedResult = await query(`
      SELECT COUNT(*) as confirmed 
      FROM registrations 
      WHERE payment_status = 'completed'
    `);
    const confirmedTeams = parseInt(confirmedResult.rows[0].confirmed);

    // Get total revenue
    const revenueResult = await query(`
      SELECT COALESCE(SUM(registration_fee), 0) as total_revenue 
      FROM registrations 
      WHERE payment_status = 'completed'
    `);
    const totalRevenue = parseFloat(revenueResult.rows[0].total_revenue);

    // Get pending payments
    const pendingResult = await query(`
      SELECT COUNT(*) as pending 
      FROM registrations 
      WHERE payment_status = 'pending'
    `);
    const pendingPayments = parseInt(pendingResult.rows[0].pending);

    // Get total players
    const playersResult = await query('SELECT COUNT(*) as total FROM players');
    const totalPlayers = parseInt(playersResult.rows[0].total);

    // Get contact messages
    const messagesResult = await query('SELECT COUNT(*) as total FROM contact_messages');
    const contactMessages = parseInt(messagesResult.rows[0].total);

    return NextResponse.json({
      stats: {
        totalTeams,
        confirmedTeams,
        totalRevenue,
        pendingPayments,
        totalPlayers,
        contactMessages,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


