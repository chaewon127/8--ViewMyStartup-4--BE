/*
  Warnings:

  - The primary key for the `MyStartup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mycrop_id` on the `MyStartup` table. All the data in the column will be lost.
  - The required column `mycorp_id` was added to the `MyStartup` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MyStartup" DROP CONSTRAINT "MyStartup_pkey",
DROP COLUMN "mycrop_id",
ADD COLUMN     "mycorp_id" TEXT NOT NULL,
ADD CONSTRAINT "MyStartup_pkey" PRIMARY KEY ("mycorp_id");
