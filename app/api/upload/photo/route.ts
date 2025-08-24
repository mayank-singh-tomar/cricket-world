import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { updateProfile } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get the JWT token from cookies
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify the JWT token
    const payload = verifyJWT(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const userId = payload.userId

    // Parse the form data
    const formData = await request.formData()
    const file = formData.get('photo') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No photo file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Update the profile with photo data
    const updatedProfile = await updateProfile(userId, {
      photo_data: buffer,
      photo_mime_type: file.type,
      photo_url: null // We don't need URL since we're storing in DB
    })

    return NextResponse.json({
      success: true,
      message: 'Photo uploaded successfully',
      profile: {
        id: updatedProfile.id,
        photo_mime_type: updatedProfile.photo_mime_type
      }
    })

  } catch (error) {
    console.error('Photo upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


