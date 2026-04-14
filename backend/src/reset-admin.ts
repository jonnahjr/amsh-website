import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@amsh.gov.et';
    const newPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
    });

    console.log(`Password for ${email} has been reset to: ${newPassword}`);
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
