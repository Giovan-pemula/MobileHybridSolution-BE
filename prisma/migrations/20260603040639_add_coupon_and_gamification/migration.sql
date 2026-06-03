-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "couponId" INTEGER,
ADD COLUMN     "discountAmt" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "serviceFee" DOUBLE PRECISION NOT NULL DEFAULT 10000;

-- CreateTable
CREATE TABLE "UserXp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserXp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XpHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XpHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLoginStreak" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "lastLoginDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLoginStreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "discountPct" INTEGER NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItemRevenue" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "discountAmt" DOUBLE PRECISION NOT NULL,
    "netRevenue" DOUBLE PRECISION NOT NULL,
    "trainerShare" DOUBLE PRECISION NOT NULL,
    "platformShare" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItemRevenue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserXp_userId_key" ON "UserXp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLoginStreak_userId_key" ON "UserLoginStreak"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItemRevenue_orderItemId_key" ON "OrderItemRevenue"("orderItemId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserXp" ADD CONSTRAINT "UserXp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpHistory" ADD CONSTRAINT "XpHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLoginStreak" ADD CONSTRAINT "UserLoginStreak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemRevenue" ADD CONSTRAINT "OrderItemRevenue_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
