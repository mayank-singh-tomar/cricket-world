import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

// GET /api/admin/contact-messages - Get all contact messages
export async function GET(request: NextRequest) {
  try {
    const result = await query(`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ messages: result.rows });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/contact-messages - Create a new contact message
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create contact message
    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, subject || '', message]
    );

    return NextResponse.json({ message: result.rows[0] });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



