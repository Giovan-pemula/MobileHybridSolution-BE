import { PrismaClient } from '../../generated/prisma/client';

async function seedGamification(prisma: PrismaClient, userIds: number[]) {
  console.log('Seeding gamification data (XP, Streaks, Coupons)...');

  let xpCount = 0;
  let streakCount = 0;
  let couponCount = 0;

  for (const userId of userIds) {
    // 1. Seed UserXp (e.g., 250 XP so they can spin gacha)
    await prisma.userXp.upsert({
      where: { userId },
      update: { xp: 250 },
      create: { userId, xp: 250 },
    });
    xpCount++;

    // Seed some initial XP history to make it realistic
    const existingHistory = await prisma.xpHistory.findFirst({ where: { userId } });
    if (!existingHistory) {
      await prisma.xpHistory.createMany({
        data: [
          { userId, amount: 150, activity: 'COURSE_CHECKOUT', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          { userId, amount: 100, activity: 'LOGIN_STREAK', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        ],
      });
    }

    // 2. Seed UserLoginStreak (e.g., 3 days streak)
    await prisma.userLoginStreak.upsert({
      where: { userId },
      update: {
        currentStreak: 3,
        lastLoginDate: new Date(),
      },
      create: {
        userId,
        currentStreak: 3,
        lastLoginDate: new Date(),
      },
    });
    streakCount++;

    // 3. Seed Coupons (one unused, one used)
    const existingCoupon = await prisma.coupon.findFirst({ where: { userId } });
    if (!existingCoupon) {
      const coupons = [
        { userId, discountPct: 10, isUsed: false },
        { userId, discountPct: 20, isUsed: true, usedAt: new Date() },
      ];

      for (const coupon of coupons) {
        await prisma.coupon.create({ data: coupon });
        couponCount++;
      }
    }
  }

  console.log(`  ✓ ${xpCount} User XP records seeded/updated`);
  console.log(`  ✓ ${streakCount} User Login Streaks seeded/updated`);
  console.log(`  ✓ ${couponCount} Coupons seeded`);
}

export default seedGamification;
