-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Investemt" (
    "investment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "amount_comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investemt_pkey" PRIMARY KEY ("investment_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Corporation" (
    "corp_id" TEXT NOT NULL,
    "corp_name" TEXT NOT NULL,
    "corp_tag" TEXT NOT NULL,
    "corp_profile" TEXT,
    "total_investment" DOUBLE PRECISION DEFAULT 0,
    "corp_sales" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "employee" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corporation_pkey" PRIMARY KEY ("corp_id")
);

-- CreateTable
CREATE TABLE "MyCorp" (
    "mycrop_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MyCorp_pkey" PRIMARY KEY ("mycrop_id")
);

-- CreateTable
CREATE TABLE "CompareCorp" (
    "comparecorp_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompareCorp_pkey" PRIMARY KEY ("comparecorp_id")
);

-- CreateTable
CREATE TABLE "CountCorp" (
    "countcorp_id" TEXT NOT NULL,
    "corp_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "my_compare_corp" INTEGER DEFAULT 0,
    "compare_corp" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountCorp_pkey" PRIMARY KEY ("countcorp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
