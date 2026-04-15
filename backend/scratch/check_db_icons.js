const { PrismaClient } = require('../node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const models = ['department', 'departmentCategory', 'service', 'serviceCategory'];
  
  for (const model of models) {
    const items = await prisma[model].findMany({ where: { icon: { not: null } } });
    console.log(`Found ${items.length} items in ${model} with icons.`);
    
    // We will just print the distinct icons first to see what mojibake exists
    const distinctIcons = [...new Set(items.map(i => i.icon))];
    console.log(`Distinct icons in ${model}:`, distinctIcons);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
