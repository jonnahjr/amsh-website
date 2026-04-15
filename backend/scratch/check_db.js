const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
    
    const admin = await prisma.user.findFirst({
      where: { id: 'cmlux3st9000020sdshmhqif9' }
    });
    console.log('Specific author exists:', !!admin);

    const postCount = await prisma.post.count();
    console.log('Post count:', postCount);

    const samplePost = await prisma.post.findFirst({
      include: { author: true }
    });
    console.log('Sample post with author:', samplePost ? 'found' : 'none');
  } catch (err) {
    console.error('Check failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
