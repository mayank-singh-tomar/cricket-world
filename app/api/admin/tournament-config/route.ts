import { NextRequest, NextResponse } from 'next/server'
import { tournamentConfig } from '@/lib/tournament-config'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      config: tournamentConfig
    })
  } catch (error) {
    console.error('Error fetching tournament config:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // In a real application, you would verify admin authentication here
    const updatedConfig = await request.json()
    
    // For now, we'll just return the updated config
    // In a real implementation, you would save this to a database
    return NextResponse.json({
      success: true,
      message: 'Tournament configuration updated successfully',
      config: updatedConfig
    })
  } catch (error) {
    console.error('Error updating tournament config:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


