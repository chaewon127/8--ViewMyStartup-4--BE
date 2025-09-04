/*
  Warnings:

  - You are about to drop the `MyCorp` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Investemt" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "MyCorp";

-- CreateTable
CREATE TABLE "MyStartup" (
    "mycrop_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MyStartup_pkey" PRIMARY KEY ("mycrop_id")
);
