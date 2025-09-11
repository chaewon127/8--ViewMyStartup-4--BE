import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { skip } from "node:test";

const investmentService = {
  /* 투자 현황 조회 페이지 */
  getInvestments: async ({ offset, limit, sortBy, order }) => {
    if (sortBy === "virtual") {
      //Corp, Investment 데이터 가져오기
      const corps = await prisma.corp.findMany({
        skip: offset,
        take: limit,
        select: {
          id: true,
          corp_name: true,
          corp_tag: true,
          corp_profile: true,
          total_investment: true,
          Investment: {
            select: { amount: true },
          },
        },
      });

      //가상 투자 금액 정렬과 실제 누적 투자 금액 정렬 결과 합치기
      const merged = corps.map((corp) => {
        const virtualSum = corp.Investment.reduce(
          (acc, inv) => acc + inv.amount,
          0
        );
        return {
          corpId: corp.id,
          corp_name: corp.corp_name,
          corp_tag: corp.corp_tag,
          corp_profile: corp.corp_profile,
          virtual_investment: virtualSum,
          total_investment: corp.total_investment,
        };
      });
      /* merge한 결과 - _sum.amount와 corp 정보를 합쳐 최종 객체 생성
      {
        corpId: "abc123",
        corp_name: "A Corp",
        corp_tag: "IT",
        corp_profile: "...",
        virtual_investment: 5000,
        total_investment: 10000
      },
      */

      // merge한 대로 정렬
      merged.sort((a, b) =>
        order === "desc"
          ? b.virtual_investment - a.virtual_investment
          : a.virtual_investment - b.virtual_investment
      );

      const total = await prisma.corp.count({
        where: { Investment: { some: {} } },
      });

      return { data: merged, total };
    }

    if (sortBy === "real") {
      const realInvestments = await prisma.corp.findMany({
        skip: offset,
        take: limit,
        orderBy: { total_investment: order },
        select: {
          id: true,
          corp_name: true,
          corp_tag: true,
          corp_profile: true,
          corp_image: true,
          total_investment: true,
        },
      });

      const total = await prisma.corp.count();

      return { data: realInvestments, total };
    }

    throw new Error("Invaild sortBy value");
  },

  /* 투자자 코멘트 리스트 조회 */
  getInvestmentComments: async ({ offset, limit }) => {
    const investmentComments = await prisma.investment.findMany({
      orderBy: { amount: "desc" },
      skip: parseInt(offset),
      take: parseInt(limit),
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
