import bcrypt from 'bcryptjs';
import { PrismaClient } from '../../generated/prisma/client';

const regularUsers = [
  { name: 'Ahmad Fauzi', email: 'ahmad@user.com', password: 'user123' },
  { name: 'Dewi Lestari', email: 'dewi@user.com', password: 'user123' },
  { name: 'Reza Pratama', email: 'reza@user.com', password: 'user123' },
  { name: 'Nurul Hidayah', email: 'nurul@user.com', password: 'user123' },
  { name: 'Bagas Wicaksono', email: 'bagas@user.com', password: 'user123' },
];

async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding regular users...');

  const createdUsers: number[] = [];

  for (const user of regularUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: 'USER',
      },
    });
    createdUsers.push(created.id);
    console.log(`  ✓ User seeded: ${created.email}`);
  }

  console.log(`${createdUsers.length} users seeded`);
  return createdUsers;
}

export default seedUsers;
