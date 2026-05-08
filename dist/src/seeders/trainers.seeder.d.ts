import { PrismaClient } from '../../generated/prisma/client';
declare function seedTrainers(prisma: PrismaClient): Promise<{
    id: number;
    name: string;
    email: string;
}[]>;
export default seedTrainers;
//# sourceMappingURL=trainers.seeder.d.ts.map