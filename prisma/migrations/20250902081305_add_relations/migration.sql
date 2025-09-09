/*
  Warnings:

  - You are about to drop the `Investemt` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Investemt";

-- CreateTable
CREATE TABLE "Investment" (
    "investment_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "amount_comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("investment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "Account"("user_id");

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "Corporation"("corp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "Corporation"("corp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyStartup" ADD CONSTRAINT "MyStartup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyStartup" ADD CONSTRAINT "MyStartup_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "Corporation"("corp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompareCorp" ADD CONSTRAINT "CompareCorp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompareCorp" ADD CONSTRAINT "CompareCorp_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "Corporation"("corp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountCorp" ADD CONSTRAINT "CountCorp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountCorp" ADD CONSTRAINT "CountCorp_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "Corporation"("corp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
