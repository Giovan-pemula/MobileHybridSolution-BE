import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Course
 *
 */
export type Course = Prisma.CourseModel;
/**
 * Model Section
 *
 */
export type Section = Prisma.SectionModel;
/**
 * Model Lesson
 *
 */
export type Lesson = Prisma.LessonModel;
/**
 * Model Enrollment
 *
 */
export type Enrollment = Prisma.EnrollmentModel;
/**
 * Model Rating
 *
 */
export type Rating = Prisma.RatingModel;
/**
 * Model Wishlist
 *
 */
export type Wishlist = Prisma.WishlistModel;
/**
 * Model TrainerRequest
 *
 */
export type TrainerRequest = Prisma.TrainerRequestModel;
/**
 * Model Discussion
 *
 */
export type Discussion = Prisma.DiscussionModel;
/**
 * Model Reply
 *
 */
export type Reply = Prisma.ReplyModel;
/**
 * Model LessonCompletion
 *
 */
export type LessonCompletion = Prisma.LessonCompletionModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
/**
 * Model UserXp
 *
 */
export type UserXp = Prisma.UserXpModel;
/**
 * Model XpHistory
 *
 */
export type XpHistory = Prisma.XpHistoryModel;
/**
 * Model UserLoginStreak
 *
 */
export type UserLoginStreak = Prisma.UserLoginStreakModel;
/**
 * Model Coupon
 *
 */
export type Coupon = Prisma.CouponModel;
/**
 * Model OrderItemRevenue
 *
 */
export type OrderItemRevenue = Prisma.OrderItemRevenueModel;
//# sourceMappingURL=client.d.ts.map