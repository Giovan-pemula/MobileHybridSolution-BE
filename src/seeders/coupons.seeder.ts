import { PrismaClient } from '../../generated/prisma/client';

async function seedCoupons(prisma: PrismaClient, userIds: number[]) {
  console.log('Seeding coupons...');

  let couponCount = 0;
  for (const userId of userIds) {
    const existing = await prisma.coupon.findFirst({
      where: { userId },
    });

    if (existing) {
      console.log(`  ⚠ Skipping coupon seeding for User ID ${userId} (coupons already exist)`);
      continue;
    }

    // Seed 2 coupons for each user: one unused (10% discount), one used (20% discount)
    const coupons = [
      { userId, discountPct: 10, isUsed: false },
      { userId, discountPct: 20, isUsed: true, usedAt: new Date() },
    ];

    for (const coupon of coupons) {
      await prisma.coupon.create({
        data: coupon,
      });
      couponCount++;
    }
  }

  console.log(`${couponCount} coupons seeded`);
}

export default seedCoupons;
