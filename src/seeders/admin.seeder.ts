import bcrypt from 'bcryptjs';
import { PrismaClient } from "../../generated/prisma/client";

async function seedAdmin(prisma: PrismaClient) {
  console.log('Seeding admin user...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin seeded:', admin.email);
}

export default seedAdmin;




