import { Injectable, BadRequestException } from '@nestjs/common';
import { GamificationRepository } from './gamification.repository';

@Injectable()
export class GamificationService {
  constructor(private readonly gamificationRepository: GamificationRepository) {}

  async getDashboard(userId: number) {
    const xp = await this.gamificationRepository.getUserXp(userId);
    const streak = await this.gamificationRepository.getUserLoginStreak(userId);
    const coupons = await this.gamificationRepository.getUnusedCoupons(userId);
    const history = await this.gamificationRepository.getXpHistory(userId);

    return {
      xp: xp.xp,
      currentStreak: streak.currentStreak,
      lastLoginDate: streak.lastLoginDate,
      unusedCoupons: coupons,
      history,
    };
  }

  async addXp(userId: number, amount: number, activity: string) {
    return this.gamificationRepository.addXp(userId, amount, activity);
  }

  async spinGacha(userId: number) {
    const SPIN_COST = 100;
    const xpRecord = await this.gamificationRepository.getUserXp(userId);

    if (xpRecord.xp < SPIN_COST) {
      throw new BadRequestException(`Not enough XP to spin. Required: ${SPIN_COST}, Current: ${xpRecord.xp}`);
    }

    // Deduct XP
    await this.gamificationRepository.deductXp(userId, SPIN_COST, 'GACHA_SPIN');

    // Roll gacha
    const random = Math.random() * 100; // 0 to 100
    let discountPct = 0;

    // Probabilities:
    // 2% Discount -> 30%
    // 5% Discount -> 40%
    // 8% Discount -> 15%
    // 10% Discount -> 10%
    // 20% Discount -> 5%
    
    if (random < 30) {
      discountPct = 2;
    } else if (random < 70) { // 30 + 40
      discountPct = 5;
    } else if (random < 85) { // 70 + 15
      discountPct = 8;
    } else if (random < 95) { // 85 + 10
      discountPct = 10;
    } else { // remaining 5%
      discountPct = 20;
    }

    const coupon = await this.gamificationRepository.createCoupon(userId, discountPct);
    return {
      message: `Congratulations! You won a ${discountPct}% discount coupon!`,
      coupon,
    };
  }

  async handleDailyFirstMark(userId: number) {
    const streak = await this.gamificationRepository.getUserLoginStreak(userId);
    
    const now = new Date();
    // Normalize dates to start of day (local time approximation or UTC)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDate = new Date(streak.lastLoginDate.getFullYear(), streak.lastLoginDate.getMonth(), streak.lastLoginDate.getDate());

    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Already marked today, do nothing
      return { addedXp: 0, currentStreak: streak.currentStreak };
    }

    let newStreak = streak.currentStreak;
    if (diffDays === 1) {
      // Consecutive day
      newStreak += 1;
    } else {
      // Missed a day, reset streak
      newStreak = 1;
    }

    await this.gamificationRepository.updateLoginStreak(userId, newStreak, today);
    await this.gamificationRepository.addXp(userId, 3, 'LOGIN_STREAK');

    return { addedXp: 3, currentStreak: newStreak };
  }
}
