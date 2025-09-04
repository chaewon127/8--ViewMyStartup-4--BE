/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `corp_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Investment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `corp_id` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `investment_id` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Investment` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CompareCorp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Corporation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CountCorp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyStartup` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Investment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `gender` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('M', 'F', 'N');

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_corp_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CompareCorp" DROP CONSTRAINT "CompareCorp_corp_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CompareCorp" DROP CONSTRAINT "CompareCorp_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CountCorp" DROP CONSTRAINT "CountCorp_corp_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CountCorp" DROP CONSTRAINT "CountCorp_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Investment" DROP CONSTRAINT "Investment_account_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Investment" DROP CONSTRAINT "Investment_corp_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Investment" DROP CONSTRAINT "Investment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MyStartup" DROP CONSTRAINT "MyStartup_corp_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MyStartup" DROP CONSTRAINT "MyStartup_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Account_user_id_key";

-- AlterTable
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "account_id",
DROP COLUMN "corp_id",
DROP COLUMN "user_id",
ADD COLUMN     "corpId" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Investment" DROP CONSTRAINT "Investment_pkey",
DROP COLUMN "account_id",
DROP COLUMN "corp_id",
DROP COLUMN "investment_id",
DROP COLUMN "user_id",
ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Investment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."CompareCorp";

-- DropTable
DROP TABLE "public"."Corporation";

-- DropTable
DROP TABLE "public"."CountCorp";

-- DropTable
DROP TABLE "public"."MyStartup";

-- CreateTable
CREATE TABLE "public"."Corp" (
    "id" TEXT NOT NULL,
    "corp_name" TEXT NOT NULL,
    "corp_tag" TEXT NOT NULL,
    "corp_profile" TEXT NOT NULL,
    "total_investment" BIGINT NOT NULL DEFAULT 0,
    "corp_sales" BIGINT NOT NULL DEFAULT 0,
    "employee" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Option_count" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "corpId" TEXT,
    "my_compare_corp" INTEGER NOT NULL DEFAULT 0,
    "compare_corp" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_count_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Compare_corp" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "corpId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Compare_corp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."My_compare_corp" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "corpId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "My_compare_corp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Option_count" ADD CONSTRAINT "Option_count_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Option_count" ADD CONSTRAINT "Option_count_corpId_fkey" FOREIGN KEY ("corpId") REFERENCES "public"."Corp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compare_corp" ADD CONSTRAINT "Compare_corp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compare_corp" ADD CONSTRAINT "Compare_corp_corpId_fkey" FOREIGN KEY ("corpId") REFERENCES "public"."Corp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."My_compare_corp" ADD CONSTRAINT "My_compare_corp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."My_compare_corp" ADD CONSTRAINT "My_compare_corp_corpId_fkey" FOREIGN KEY ("corpId") REFERENCES "public"."Corp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_corpId_fkey" FOREIGN KEY ("corpId") REFERENCES "public"."Corp"("id") ON DELETE SET NULL ON UPDATE CASCADE;
