/*
  Warnings:

  - Made the column `corp_image` on table `Corp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Corp" ALTER COLUMN "corp_image" SET NOT NULL;
