import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

const investmentService = {
  /* 투자자 코멘트 리스트 조회 */
  getInvestments: async ({ offset, limit }) => {
    const investments = await prisma.investment.findMany({
      orderBy: { amount: "desc" },
      skip: parseInt(offset),
      take: parseInt(limit),
    });

    if (!investments || investments.length === 0) {
      throw new Error("No investments found");
    }

    return investments;
  },

  /* 투자자 코멘트 상세 조회 */
  getInvestmentById: async (id) => {
    const investment = await prisma.investment.findUnique({
      where: { id },
    });
    if (!investment) {
      throw new Error("Cannot find given id");
    }
    return investment;
  },

  /* 투자자 코멘트 글 작성 */
  createInvestment: async ({ name, amount, comment, password }) => {
    const investment = await prisma.investment.create({
      data: { name, amount, comment, password },
    });
    return investment;
  },

  /* 투자자 코멘트 글 수정 */
  updateInvestment: async (id, { name, amount, comment, password }) => {
    const investment = await prisma.investment.findUnique({
      where: { id },
    });
    if (!investment) {
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
  deleteInvestment: async (id, password) => {
    const investment = await prisma.investment.findUnique({
      where: { id },
    });
    if (!investment) {
      throw new Error("Cannot find given id");
    }

    const isValid = await bcrypt.compare(password, investment.password);
    if (!isValid) {
      throw new Error("Password is not valid");
    }

    await prisma.investment.delete({
      where: { id },
    });
    return true;
  },
};

export default investmentService;
