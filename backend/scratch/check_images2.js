require('dotenv').config({path: '.env'});
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.department.findMany({select: {name: true, image: true, headImage: true}, take: 5}).then(console.log).finally(() => p.$disconnect());
