const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log('Users in DB:', users.map(u => ({ email: u.email, role: u.role, isActive: u.isActive })));
}

main().finally(() => prisma.$disconnect());
