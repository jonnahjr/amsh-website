const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    const items = await prisma.research.findMany();
    for (const item of items) {
        let pProp = item.publishedProposal;
        if (pProp && pProp.includes('/api/uploads/')) pProp = pProp.substring(pProp.lastIndexOf('/') + 1);
        else if (pProp && pProp.includes('/uploads/')) pProp = pProp.substring(pProp.lastIndexOf('/') + 1);

        let pEth = item.publishedEthical;
        if (pEth && pEth.includes('/api/uploads/')) pEth = pEth.substring(pEth.lastIndexOf('/') + 1);
        else if (pEth && pEth.includes('/uploads/')) pEth = pEth.substring(pEth.lastIndexOf('/') + 1);

        await prisma.research.update({
            where: { id: item.id },
            data: { publishedProposal: pProp, publishedEthical: pEth }
        });
    }
    console.log('Fixed Published PDFs!');
}

fix().catch(console.error).finally(() => prisma.$disconnect());
