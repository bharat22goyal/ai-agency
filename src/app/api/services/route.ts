import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// Get all services
export async function GET() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
    
    const session = await getServerSession(authOptions)
    
    const services = await prisma.service.findMany({
      where: {
        published: session ? undefined : true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return new Response(JSON.stringify(services || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error in GET /api/services:', error instanceof Error ? error.message : String(error))
    
    const statusCode = error instanceof Prisma.PrismaClientInitializationError ? 503 : 500
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to fetch services',
        error: errorMessage
      }),
      { 
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Create new service
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const data = await request.json()
    
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        features: data.features || [],
        benefits: data.benefits,
        icon: data.icon || 'SparklesIcon',
        published: data.published
      }
    })

    return new Response(JSON.stringify(service), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error creating service:', error)
    return new Response(
      JSON.stringify({ 
        message: 'Error creating service', 
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

// Update service
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const { id, ...data } = await request.json()
    
    const service = await prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        features: data.features || [],
        benefits: data.benefits,
        icon: data.icon || 'SparklesIcon',
        published: data.published
      }
    })

    return new Response(JSON.stringify(service), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error updating service:', error)
    return new Response(
      JSON.stringify({ 
        message: 'Error updating service', 
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
      },
    })
  }
}

// Delete service
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const { id } = await request.json()
    
    await prisma.service.delete({
      where: { id }
    })

    return new Response(JSON.stringify({ message: 'Service deleted' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error deleting service:', error)
    return new Response(
      JSON.stringify({ 
        message: 'Error deleting service', 
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
} 