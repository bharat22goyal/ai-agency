import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log('Database connection successful')
    
    return new Response(JSON.stringify({ status: 'ok', message: 'Database connected' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return new Response(
      JSON.stringify({ 
        status: 'error', 
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } finally {
    await prisma.$disconnect()
  }
} 