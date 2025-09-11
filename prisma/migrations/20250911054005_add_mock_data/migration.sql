/*
  Warnings:

  - A unique constraint covering the columns `[userId,corpId]` on the table `Compare_corp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,corpId]` on the table `My_compare_corp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,corpId]` on the table `Option_count` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Investment" ADD COLUMN     "corpId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Compare_corp_userId_corpId_key" ON "public"."Compare_corp"("userId", "corpId");

-- CreateIndex
CREATE UNIQUE INDEX "My_compare_corp_userId_corpId_key" ON "public"."My_compare_corp"("userId", "corpId");

-- CreateIndex
CREATE UNIQUE INDEX "Option_count_userId_corpId_key" ON "public"."Option_count"("userId", "corpId");

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_corpId_fkey" FOREIGN KEY ("corpId") REFERENCES "public"."Corp"("id") ON DELETE SET NULL ON UPDATE CASCADE;
