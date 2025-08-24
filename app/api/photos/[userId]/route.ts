import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    // Get photo data from database
    const result = await query(
      'SELECT photo_data, photo_mime_type FROM profiles WHERE id = $1',
      [userId]
    )

    if (!result.rows[0] || !result.rows[0].photo_data) {
      // Return a default placeholder image or 404
      return new NextResponse(null, { status: 404 })
    }

    const { photo_data, photo_mime_type } = result.rows[0]

    // Return the image with proper headers
    return new NextResponse(photo_data, {
      headers: {
        'Content-Type': photo_mime_type || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'Content-Length': photo_data.length.toString(),
      },
    })

  } catch (error) {
    console.error('Error serving photo:', error)
    return new NextResponse(null, { status: 500 })
  }
}


