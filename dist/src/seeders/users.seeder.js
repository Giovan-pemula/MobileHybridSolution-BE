"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const regularUsers = [
    { name: 'Ahmad Fauzi', email: 'ahmad@user.com', password: 'user123' },
    { name: 'Dewi Lestari', email: 'dewi@user.com', password: 'user123' },
    { name: 'Reza Pratama', email: 'reza@user.com', password: 'user123' },
    { name: 'Nurul Hidayah', email: 'nurul@user.com', password: 'user123' },
    { name: 'Bagas Wicaksono', email: 'bagas@user.com', password: 'user123' },
];
async function seedUsers(prisma) {
    console.log('Seeding regular users...');
    const createdUsers = [];
    for (const user of regularUsers) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
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
exports.default = seedUsers;
//# sourceMappingURL=users.seeder.js.map