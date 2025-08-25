import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, updateProfile } from '@/lib/auth';

export async function PUT(request: NextRequest) {
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

    const {
      fullName,
      phone,
      address,
      age,
      aadharId,
      playerType,
      photoUrl
    } = await request.json();

    // Validate required fields
    if (!fullName) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    // Update profile
    const updatedProfile = await updateProfile(decoded.userId, {
      full_name: fullName,
      phone: phone || '',
      address: address || '',
      age: age || null,
      aadhar_id: aadharId || '',
      player_type: playerType || '',
      photo_url: photoUrl || null,
    });

    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



