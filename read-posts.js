const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function readPosts() {
  try {
    const posts = await prisma.blogPost.findMany();
    console.log('All blog posts:', posts);
  } catch (error) {
    console.error('Error reading posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

readPosts(); 