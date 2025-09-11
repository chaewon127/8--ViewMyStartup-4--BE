import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { skip } from "node:test";

const investmentService = {
  /* 투자 현황 조회 페이지 */
  getInvestments: async ({ offset, limit, sortBy, order }) => {
    switch (sortBy) {
      case "virtual":
        // 가상 투자 금액 합산 후 정렬, 합산은 DB에서 SUM 쿼리로 실행
        const virtualInvestments = await prisma.investment.groupBy({
          by: ["corpId"],
          _sum: { amount: true },
          orderBy: { _sum: { amount: order } },
          skip: offset,
          take: limit,
        });

        if (!virtualInvestments || virtualInvestments.length === 0) {
          return { data: [], message: "No Virtual Investments Found" };
        }

        return virtualInvestments;

      case "real":
        // 실제 누적 투자 금액 정렬
        const realInvestments = await prisma.corp.findMany({
          orderBy: { total_investment: orderBy },
          skip: offset,
          take: limit,
        });

        if (!realInvestments || realInvestments.length === 0) {
          return { data: [], message: "No Real Investments Found" };
        }

        return realInvestments;

      default:
        throw new Error("Invaild sortBy value");
    }
  },

  /* 투자자 코멘트 리스트 조회 */
  getInvestmentComments: async ({ offset, limit }) => {
    const investmentComments = await prisma.investment.findMany({
      orderBy: { amount: "desc" },
      skip: offset,
      take: limit,
      select: {
        Account: true,
      },
    });

    if (!investmentComments || investmentComments.length === 0) {
      throw new Error("No comments found");
    }

    return investmentCommetns;
  },

  // /* 투자자 코멘트 상세 조회 */
  // getInvestmentCommentById: async (id) => {
  //   const investmentComment = await prisma.investment.findUnique({
  //     where: { id },
  //     select: {
  //       id: true,
  //       name: true,
  //       amount: true,
  //       comment: true,
  //       createdAt: false,
  //       updatedAt: false,
  //       // password: false, // 비밀번호는 제외
  //     },
  //   });
  //   if (!investmentComment) {
  //     throw new Error("Cannot find given id");
  //   }
  //   return investmentComment;
  // },

  /* 투자자 코멘트 글 작성 */
  createInvestmentComment: async ({
    name,
    amount,
    comment,
    password,
    passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const investmentComment = await prisma.investment.create({
      data: { name, amount, comment, password: hashedPassword },
      select: {
        Account: true,
      },
    });
    return investmentComment;
  },

  /* 투자자 코멘트 글 수정 */
  updateInvestmentComment: async (id, { name, amount, comment, password }) => {
    const investmentComment = await prisma.investment.findUnique({
      where: { id },
      select: {
        Account: true,
      },
    });
    if (!investmentComment) {
      throw new Error("Cannot find given id");
    }

    /* brcypt: 비밀번호를 해시(암호화)해서 DB에 저장 */
    const isValid = await bcrypt.compare(password, investment.password);
    if (!isValid) {
      throw new Error("Password is not valid");
    }

    return prisma.investment.update({
      where: { id },
      data: { name, amount, comment },
    });
  },

  /* 투자자 코멘트 글 삭제 */
  deleteInvestmentComment: async (id, password) => {
    const investmentComment = await prisma.investment.findUnique({
      where: { id },
    });
    if (!investmentComment) {
      throw new Error("Cannot find given id");
    }

    const isValid = await bcrypt.compare(password, investment.password);
    if (!isValid) {
      throw new Error("Password is not valid");
    }

    await prisma.investment.delete({
      where: { id },
      select: {
        Account: true,
      },
    });
    return true;
  },

  /* 투자 기록 저장 */
  // saveAccount: async ({ userId, corpId, name, amount, comment }) => {
  //   const account = await prisma.account.create({
  //     data: {
  //       userId: userId,
  //       corpId: corpId,
  //       name,
  //       amount,
  //       comment,
  //     },
  //   });
  //   return account;
  // },
};

export default investmentService;
