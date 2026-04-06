"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seedAdmin(prisma) {
    console.log('Seeding admin user...');
    const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
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
exports.default = seedAdmin;
//# sourceMappingURL=admin.seeder.js.map