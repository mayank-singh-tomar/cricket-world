import { NextRequest, NextResponse } from 'next/server'
import { createUser, createProfile, getUserByEmail } from '@/lib/auth'
import { generateJWT } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      fullName,
      phone,
      address,
      age,
      dateOfBirth,
      gender,
      nationality,
      teamName,
      aadharId,
      playerType,
      photoUrl,
      photoFileId,
      photoData,
      photoMimeType
    } = await request.json()

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const user = await createUser(email, password)

    // Convert photo data from base64 to buffer if provided
    let photoBuffer = null
    if (photoData && photoMimeType) {
      try {
        // Remove data URL prefix if present
        const base64Data = photoData.replace(/^data:image\/[a-z]+;base64,/, '')
        photoBuffer = Buffer.from(base64Data, 'base64')
      } catch (error) {
        console.error('Error converting photo data:', error)
        // Continue without photo if conversion fails
      }
    }

    // Create profile
    const profile = await createProfile({
      id: user.id,
      full_name: fullName,
      phone: phone || '',
      address: address || '',
      age: age || null,
      date_of_birth: dateOfBirth || null,
      gender: gender || 'Male',
      nationality: nationality || 'Indian',
      team_name: teamName || null,
      aadhar_id: aadharId || '',
      player_type: playerType || '',
      photo_url: photoUrl || null,
      photo_data: photoBuffer,
      photo_mime_type: photoMimeType || null,
      email: email,
    })

    // Generate JWT token
    const token = generateJWT(user.id)

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
      },
      profile: {
        id: profile.id,
        full_name: profile.full_name,
        email: profile.email,
      },
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
