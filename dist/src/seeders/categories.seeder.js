"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function seedCategories(prisma) {
    console.log('Seeding categories...');
    const categories = [
        { name: 'Web Development', slug: 'web-development' },
        { name: 'Mobile Development', slug: 'mobile-development' },
        { name: 'Data Science', slug: 'data-science' },
        { name: 'Machine Learning', slug: 'machine-learning' },
        { name: 'DevOps', slug: 'devops' },
        { name: 'Cloud Computing', slug: 'cloud-computing' },
        { name: 'Cybersecurity', slug: 'cybersecurity' },
        { name: 'UI/UX Design', slug: 'ui-ux-design' },
        { name: 'Game Development', slug: 'game-development' },
        { name: 'Blockchain', slug: 'blockchain' },
    ];
    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: { name: category.name },
            create: category,
        });
    }
    console.log(`${categories.length} categories seeded`);
}
exports.default = seedCategories;
//# sourceMappingURL=categories.seeder.js.map