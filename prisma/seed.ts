import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import seedAdmin from '../src/seeders/admin.seeder';
import seedCategories from '../src/seeders/categories.seeder';
import seedTrainers from '../src/seeders/trainers.seeder';
import seedUsers from '../src/seeders/users.seeder';
import seedCourses from '../src/seeders/courses.seeder';
import seedInteractions from '../src/seeders/interactions.seeder';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('\n🌱 Seeding database...\n');

  // 1. Admin
  await seedAdmin(prisma);

  // 2. Categories (needed before courses)
  await seedCategories(prisma);

  // 3. Trainers — returns array of { id, name, email }
  const trainers = await seedTrainers(prisma);
  const trainerIds = trainers.map((t) => t.id);

  // 4. Regular users — returns array of user IDs
  const userIds = await seedUsers(prisma);

  // 5. Courses + sections + lessons (depends on trainers & categories)
  await seedCourses(prisma, trainerIds);

  // 6. Fetch all published course IDs in insertion order for interactions
  const courses = await prisma.course.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { id: 'asc' },
    select: { id: true },
  });
  const courseIds = courses.map((c) => c.id);

  // 7. Enrollments, ratings & discussions
  await seedInteractions(prisma, userIds, courseIds);

  console.log('\n✅ All seeds completed successfully!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
