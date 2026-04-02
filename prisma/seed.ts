import prisma from '../src/config/database';
import seedAdmin from '../src/seeders/admin.seeder';
import seedCategories from '../src/seeders/categories.seeder';

async function main() {
  console.log('Seeding database...');
  await seedAdmin(prisma);
  await seedCategories(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
