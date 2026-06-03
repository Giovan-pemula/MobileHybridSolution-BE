import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class GamificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserXp(userId: number) {
    let userXp = await this.prisma.userXp.findUnique({ where: { userId } });
    if (!userXp) {
      userXp = await this.prisma.userXp.create({ data: { userId, xp: 0 } });
    }
    return userXp;
  }

  async addXp(userId: number, amount: number, activity: string) {
    const xpRecord = await this.getUserXp(userId);
    
    // Add XP transaction
    await this.prisma.xpHistory.create({
      data: { userId, amount, activity },
    });

    // Update total XP
    return this.prisma.userXp.update({
      where: { userId },
      data: { xp: xpRecord.xp + amount },
    });
  }

  async deductXp(userId: number, amount: number, activity: string) {
    const xpRecord = await this.getUserXp(userId);
    if (xpRecord.xp < amount) {
      throw new Error('Not enough XP');
    }

    // Add XP transaction (negative)
    await this.prisma.xpHistory.create({
      data: { userId, amount: -amount, activity },
    });

    // Update total XP
    return this.prisma.userXp.update({
      where: { userId },
      data: { xp: xpRecord.xp - amount },
    });
  }

  async getXpHistory(userId: number) {
    return this.prisma.xpHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async createCoupon(userId: number, discountPct: number) {
    return this.prisma.coupon.create({
      data: { userId, discountPct },
    });
  }

  async getUnusedCoupons(userId: number) {
    return this.prisma.coupon.findMany({
      where: { userId, isUsed: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserLoginStreak(userId: number) {
    let streak = await this.prisma.userLoginStreak.findUnique({ where: { userId } });
    if (!streak) {
      streak = await this.prisma.userLoginStreak.create({
        data: { userId, currentStreak: 0, lastLoginDate: new Date(0) },
      });
    }
    return streak;
  }

  async updateLoginStreak(userId: number, newStreak: number, lastLoginDate: Date) {
    return this.prisma.userLoginStreak.update({
      where: { userId },
      data: { currentStreak: newStreak, lastLoginDate },
    });
  }
}
