import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { tr } from "date-fns/locale";

export const signup = async ({ name, email, password, gender, birth }) => {
  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      gender,
      birth: new Date(birth),
    },
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      birth: true,
      created_at: true,
      updated_at: true,
      isDeleted: true,
    },
  });
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("이메일 또는 비밀번호가 옳바르지 않습니다.");
  }

  const vaild = await bcrypt.compare(password, user.password);
  if (!vaild) {
    throw new Error("이메일 또는 비밀번호가 옳바르지 않습니다.");
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
