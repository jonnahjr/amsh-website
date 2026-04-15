const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.department.count();
    const departments = await prisma.department.findMany({
      select: { name: true }
    });
    console.log(`Total Departments: ${count}`);
    console.log('List:');
    departments.forEach(d => console.log(`- ${d.name}`));
  } catch (error) {
    console.error('Error fetching departments:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
