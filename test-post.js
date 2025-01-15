const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestPost() {
  try {
    const post = await prisma.blogPost.create({
      data: {
        title: 'Test Blog Post',
        content: 'This is a test blog post to verify database connectivity.',
        slug: 'test-blog-post',
        published: true
      }
    });
    console.log('Successfully created test post:', post);
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPost(); 