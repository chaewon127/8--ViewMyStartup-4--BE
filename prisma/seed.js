import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import User from "./mockUser.js";
import Corp from "./mockCorp.js";
import Account from "./mockAccount.js";
import My_compare_corp from "./mockMyCompareCorp.js";
import Compare_corp from "./mockCompareCorp.js";
import Option_count from "./mockOptionCount.js";
import { generateMockInvestment } from "./mockInv.js";

const prisma = new PrismaClient();

async function main() {
  const Investment = await generateMockInvestment(60);

  // 기존 데이터 삭제
  await prisma.investment.deleteMany();
  await prisma.option_count.deleteMany();
  await prisma.compare_corp.deleteMany();
  await prisma.my_compare_corp.deleteMany();
  await prisma.account.deleteMany();
  await prisma.corp.deleteMany();
  await prisma.user.deleteMany();

  //mock 데이터 삽입
  await prisma.user.createMany({
    data: User,
    skipDuplicates: true,
  });
  await prisma.corp.createMany({
    data: Corp,
    skipDuplicates: true,
  });
  await prisma.account.createMany({
    data: Account,
    skipDuplicates: true,
  });
  await prisma.my_compare_corp.createMany({
    data: My_compare_corp,
    skipDuplicates: true,
  });
  await prisma.compare_corp.createMany({
    data: Compare_corp,
    skipDuplicates: true,
  });
  await prisma.option_count.createMany({
    data: Option_count,
    skipDuplicates: true,
  });
  for (const inv of Investment) {
    const hashedPassword = await bcrypt.hash(inv.password, 10);
    await prisma.investment.create({
      data: { ...inv, password: hashedPassword },
    });
  }

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
