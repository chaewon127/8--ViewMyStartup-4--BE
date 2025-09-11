/*
  Warnings:

  - Made the column `name` on table `Investment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Investment" ALTER COLUMN "name" SET NOT NULL;
