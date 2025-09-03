/*
  Warnings:

  - You are about to alter the column `corp_sales` on the `Corporation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Corporation" ALTER COLUMN "total_investment" DROP DEFAULT,
ALTER COLUMN "total_investment" SET DATA TYPE TEXT,
ALTER COLUMN "corp_sales" SET DEFAULT 0,
ALTER COLUMN "corp_sales" SET DATA TYPE INTEGER;
