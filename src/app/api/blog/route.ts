import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// Get all posts
export async function GET() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
    
    const session = await getServerSession(authOptions)
    
    const posts = await prisma.blogPost.findMany({
      where: {
        published: session ? undefined : true
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        content: true,
        description: true,
        image: true,
        published: true,
        category: true,
        author: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    
    return new Response(JSON.stringify(posts || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error in GET /api/blog:', error instanceof Error ? error.message : String(error))
    
    const statusCode = error instanceof Prisma.PrismaClientInitializationError ? 503 : 500
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to fetch posts',
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
    try {
      await prisma.$disconnect()
      console.log('Database disconnected successfully')
    } catch (e) {
      console.error('Error disconnecting from database:', e instanceof Error ? e.message : 'Unknown error')
    }
  }
}

// Create new post
export async function POST(request: Request) {
  try {
    console.log('POST /api/blog - Start')
    
    const session = await getServerSession(authOptions)
    console.log('POST /api/blog - Session:', session)
    
    if (!session) {
      console.log('POST /api/blog - Unauthorized')
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const requestText = await request.text()
    console.log('POST /api/blog - Raw request body:', requestText)
    
    const data = JSON.parse(requestText)
    console.log('POST /api/blog - Parsed data:', data)

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        description: data.description,
        image: data.image || '',
        published: data.published,
        category: data.category || 'General',
        author: data.author || 'Automatrix Team',
      }
    })

    console.log('POST /api/blog - Created post:', post)
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('POST /api/blog - Error:', error)
    return new Response(
      JSON.stringify({ 
        message: 'Error creating post', 
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

// Update post
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log('PUT /api/blog - Session:', session)
    
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const requestText = await request.text()
    console.log('PUT /api/blog - Raw request body:', requestText)
    
    const { id, ...data } = JSON.parse(requestText)
    console.log('PUT /api/blog - Parsed data:', { id, ...data })

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        description: data.description,
        image: data.image || '',
        published: data.published,
        category: data.category || 'General',
        author: data.author || 'Automatrix Team',
      }
    })

    console.log('PUT /api/blog - Updated post:', post)
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('PUT /api/blog - Error:', error)
    return new Response(
      JSON.stringify({ 
        message: 'Error updating post', 
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

// Delete post
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log('DELETE /api/blog - Session:', session)
    
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const requestText = await request.text()
    console.log('DELETE /api/blog - Raw request body:', requestText)
    
    const { id } = JSON.parse(requestText)
    console.log('DELETE /api/blog - Request data:', { id })

    await prisma.blogPost.delete({
      where: { id }
    })

    console.log('DELETE /api/blog - Deleted post:', id)
    return new Response(JSON.stringify({ message: 'Post deleted' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('DELETE /api/blog - Error:', error)
    return new Response(
      JSON.stringify({ 
        message: 'Error deleting post', 
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