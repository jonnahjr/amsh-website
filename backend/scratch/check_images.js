const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Doctors images:");
    const doctors = await prisma.doctor.findMany({ select: { name: true, image: true, id: true }, take: 5 });
    console.log(doctors);
    console.log("Departments images:");
    const depts = await prisma.department.findMany({ select: { name: true, image: true, headImage: true }, take: 5 });
    console.log(depts);
}

main().catch(console.error).finally(() => prisma.$disconnect());
