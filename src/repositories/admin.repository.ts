import prisma from '../config/database';

export class AdminRepository {
  async findByEmail(email: string) {
    return prisma.admin.findUnique({
      where: { email },
    });
  }
}

export const adminRepository = new AdminRepository();
