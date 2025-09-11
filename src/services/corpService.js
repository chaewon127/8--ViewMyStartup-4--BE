import { tr } from "date-fns/locale";
import { prisma } from "../config/prisma.js";

// 전체 리스트 누적 투자 금액은 투자 테이블 조회 방식에 대해 논의 필요
export async function listCorp({ offset, limit, order, search }) {
  //리스트 누적 투자 금액 자동으로 계산하는 코드 아래 있음.
  await updateCropTotalInvestment();

  //orderBy로 조회 순서 정하기 게시판 조회 순서를 세팅하기 위해서
  let orderBy;
  switch (order) {
    case "investmentLowest":
      orderBy = { total_investment: "asc" };
      break;
    case "investmentHighest":
      orderBy = { total_investment: "desc" };
      break;
    case "salesLowest":
      orderBy = { corp_sales: "asc" };
      break;
    case "salesHighest":
      orderBy = { corp_sales: "desc" };
      break;
    case "employeeLowest":
      orderBy = { employee: "asc" };
      break;
    case "employeeHighest":
      orderBy = { employee: "desc" };
      break;
    default:
      orderBy = { total_investment: "desc" };
  }

  //검색 기능 빼먹어서 검색기능 추가
  let where;
  if (search && search.trim()) {
    where = {
      OR: [
        {
          corp_name: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          corp_tag: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ],
    };
  }

  const corps = await prisma.corp.findMany({
    where,
    orderBy: { created_at: "desc" },
    skip: parseInt(offset),
    take: parseInt(limit),
  });

  const rankingCorp = await prisma.corp.findMany({
    where,
    select: {
      id: true,
    },
    orderBy: [
      { total_investment: "desc" },
      { created_at: "asc" },
      { id: "asc" },
    ],
  });

  const rankMap = new Map();
  rankingCorp.forEach((row, idx) => {
    rankMap.set(row.id, idx + 1);
  });

  const compareCorpWithRanking = corps.map((c) => ({
    ...c,
    investment_rank: rankMap.get(c.id) ?? null,
  }));
  return compareCorpWithRanking;
}

//_sum은 투자값 합산하기 dnlgo tpxld 유틸로 빼서 조회해도 될듯
export async function updateCropTotalInvestment() {
  const totals = await prisma.investment.groupBy({
    by: ["corpId"],
    _sum: { amount: true },
  });
  // 투자 테이블이 전부 삭제 될수 있으니 초기화 코드 추가
  if (totals.length === 0) {
    return prisma.corp.updateMany({ data: { total_investment: BigInt(0) } });
  }
  await prisma.$transaction(
    totals.map((cop) =>
      prisma.corp.update({
        where: { id: cop.corpId },
        data: { total_investment: BigInt(cop._sum.amount) },
      })
    )
  );
}

// 투자 목록 공동 조회를 위해 주석처리  기업 아이디 단독 조회가 의미 없음
// export async function getCorp(id){
//   const corp = await prisma.corp.findUniqueOrThrow({
//     where: { id },
//   });
//   return corp
// }

//개별 조회 투자 테이블과 합치면 투자 테이블을 아래 조회 하게 작동시켜야 함
export async function getCorp(id) {
  const corp = await prisma.corp.findUniqueOrThrow({
    where: { id },
  });

  const investments = await prisma.investment.findMany({
    where: { corpId: id },
    orderBy: { amount: "desc" },
    select: {
      id: true,
      amount: true,
      User: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return { ...corp, investments: investments };
}
