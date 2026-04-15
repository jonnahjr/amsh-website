const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    const items = await prisma.research.findMany();
    for (const item of items) {
        let prop = item.proposal;
        if (prop && prop.includes('/api/uploads/')) {
            prop = prop.substring(prop.lastIndexOf('/') + 1);
        } else if (prop && prop.includes('/uploads/')) {
            prop = prop.substring(prop.lastIndexOf('/') + 1);
        }

        let eth = item.ethicalLetter;
        if (eth && eth.includes('/api/uploads/')) {
            eth = eth.substring(eth.lastIndexOf('/') + 1);
        } else if (eth && eth.includes('/uploads/')) {
            eth = eth.substring(eth.lastIndexOf('/') + 1);
        }

        await prisma.research.update({
            where: { id: item.id },
            data: { proposal: prop, ethicalLetter: eth }
        });
    }
    console.log('Fixed DB!');
}

fix().catch(console.error).finally(() => prisma.$disconnect());
