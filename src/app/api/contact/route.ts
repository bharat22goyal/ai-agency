import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { 
        message: 'Error fetching submissions',
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { message: 'Missing submission ID' },
        { status: 400 }
      )
    }

    await prisma.contactSubmission.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Submission deleted' })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json(
      { 
        message: 'Error deleting submission',
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate request data
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        status: 'new'
      }
    })

    return NextResponse.json({ 
      message: 'Submission received',
      data: submission
    })
  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { 
        message: 'Error processing submission',
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    )
  }
} 