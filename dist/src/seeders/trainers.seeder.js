"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const trainers = [
    {
        name: 'Budi Santoso',
        email: 'budi@trainer.com',
        password: 'trainer123',
        bio: 'Full-stack developer dengan 8 tahun pengalaman di industri teknologi. Spesialis NestJS, React, dan arsitektur microservices.',
        experience: 'Pernah mengajar di berbagai bootcamp coding selama 4 tahun dan mentoring lebih dari 200 developer.',
    },
    {
        name: 'Siti Rahayu',
        email: 'siti@trainer.com',
        password: 'trainer123',
        bio: 'Data Scientist dan Machine Learning Engineer dengan latar belakang riset dari UI. Berpengalaman dalam Python, TensorFlow, dan analitik data besar.',
        experience: 'Dosen tamu di beberapa universitas dan trainer korporat untuk perusahaan Fortune 500 di bidang AI/ML.',
    },
    {
        name: 'Andi Wijaya',
        email: 'andi@trainer.com',
        password: 'trainer123',
        bio: 'Mobile Developer spesialis Flutter dan React Native. Telah merilis 20+ aplikasi di Play Store dan App Store.',
        experience: 'Google Developer Expert untuk Flutter dan rutin berbicara di konferensi teknologi internasional.',
    },
];
async function seedTrainers(prisma) {
    console.log('Seeding trainers...');
    const createdTrainers = [];
    for (const trainer of trainers) {
        const hashedPassword = await bcryptjs_1.default.hash(trainer.password, 10);
        const user = await prisma.user.upsert({
            where: { email: trainer.email },
            update: { role: 'TRAINER' },
            create: {
                name: trainer.name,
                email: trainer.email,
                password: hashedPassword,
                role: 'TRAINER',
            },
        });
        // Upsert trainer request (APPROVED)
        await prisma.trainerRequest.upsert({
            where: { userId: user.id },
            update: { status: 'APPROVED' },
            create: {
                userId: user.id,
                bio: trainer.bio,
                experience: trainer.experience,
                cvUrl: 'https://example.com/cv-placeholder.pdf',
                status: 'APPROVED',
            },
        });
        createdTrainers.push({ id: user.id, name: user.name, email: user.email });
        console.log(`  ✓ Trainer seeded: ${user.email}`);
    }
    console.log(`${createdTrainers.length} trainers seeded`);
    return createdTrainers;
}
exports.default = seedTrainers;
//# sourceMappingURL=trainers.seeder.js.map