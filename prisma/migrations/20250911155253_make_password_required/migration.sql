/*
  Warnings:

  - Made the column `password` on table `Investment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Investment" ALTER COLUMN "password" SET NOT NULL;
