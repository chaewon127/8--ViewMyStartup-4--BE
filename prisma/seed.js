import { PrismaClient } from "@prisma/client";
import {
  User,
  Investment,
  Account,
  Corporation,
  MyStartup,
  CompareCorp,
  CountCorp,
} from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.investment.deleteMany();
  await prisma.countCorp.deleteMany();
  await prisma.compareCorp.deleteMany();
  await prisma.myStartup.deleteMany();
  await prisma.account.deleteMany();
  await prisma.corporation.deleteMany();
  await prisma.user.deleteMany();

  //mock 데이터 삽입
  await prisma.user.createMany({
    data: User,
    skipDuplicates: true,
  });
  await prisma.corporation.createMany({
    data: Corporation,
    skipDuplicates: true,
  });
  for (const acc of Account) {
    await prisma.account.create({
      data: acc,
    });
  }
  for (const myS of MyStartup) {
    await prisma.myStartup.create({
      data: myS,
    });
  }
  for (const comp of CompareCorp) {
    await prisma.compareCorp.create({
      data: comp,
    });
  }
  for (const cou of CountCorp) {
    await prisma.countCorp.create({
      data: cou,
    });
  }
  for (const inv of Investment) {
    await prisma.investment.create({
      data: inv,
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
