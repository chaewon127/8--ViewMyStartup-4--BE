import { compare } from "bcrypt";
import { prisma } from "../config/prisma.js";
import { de } from "date-fns/locale";

//전체 리스트 조회 --> 우선 확인용 테스트용 이렇게 다시 쓴 이유 corp 에는 전체
//조회 현재 코드에서는 이름 태그 카테고리만 필요하기에 다시 조회
export async function listCorpinCompare({ offset, limit, order, search }) {
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
  const total = await prisma.corp.count({ where });
  //나의 기업 비교 기업 조회시에 확인을 위해 세팅
  const compareCorps = await prisma.corp.findMany({
    where,
    orderBy: [orderBy, { created_at: "desc" }],
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      id: true,
      corp_name: true,
      corp_tag: true,
    },
  });
  //랭킹
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

  const compareCorpWithRanking = compareCorps.map((c) => ({
    ...c,
    investment_rank: rankMap.get(c.id) ?? null,
  }));
  return { compareCorpWithRanking, total };
}

//단일 기업 조회 임시 테스트용
export async function getCorpinCompare(id) {
  //orderBy로 조회 순서 정하기 게시판 조회 순서를 세팅하기 위해서
  const compareCorp = await prisma.corp.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      corp_name: true,
      corp_tag: true,
    },
  });
  return compareCorp;
}

// 나의 기업 생성 및 수정
export async function postMyCompareandOptionCount(userId, corpId) {
  await deleteMyCompareCorp();
  await deleteCompareCorp();
  await getCorpinCompare(corpId);

  // userid는 로그인 기능 제작할지 모르므로 일단 db에 저장한 id 세팅
  const compare = await prisma.my_compare_corp.upsert({
    where: {
      userId_corpId: {
        userId,
        corpId,
      },
    },
    update: {
      isDeleted: false,
      updated_at: new Date(),
    },
    create: {
      userId: userId,
      corpId: corpId,
    },
  });

  //횟수 테이블에서 데이터를 보내기 위해
  return compare;
}

// 비교 기업 생성 및 수정
export async function postCompareandOptionCount(userId, corpId) {
  await getCorpinCompare(corpId);

  // userid는 로그인 기능 제작할지 모르므로 일단 db에 저장한 id 세팅
  const compare = await prisma.compare_corp.upsert({
    where: {
      userId_corpId: { userId, corpId },
    },
    update: {
      isDeleted: false,
      userId: userId,
      corpId: corpId,
      updated_at: new Date(),
    },
    create: {
      userId: userId,
      corpId: corpId,
    },
  });

  return compare;
}

export async function postOptionCount(userId, corpId) {
  await getCorpinCompare(userId, corpId);

  const optionCount = await prisma.option_count.upsert({
    where: {
      userId_corpId: {
        userId,
        corpId,
      },
    },
    update: {
      compare_corp: { increment: 1 },
      updated_at: new Date(),
    },
    create: {
      userId,
      corpId,
      compare_corp: 1,
    },
  });
  return optionCount;
}

export async function postMyOptionCount(userId, corpId) {
  await getCorpinCompare(userId, corpId);

  const optionCountMy = await prisma.option_count.upsert({
    where: {
      userId_corpId: {
        userId,
        corpId,
      },
    },
    update: {
      my_compare_corp: { increment: 1 },
      updated_at: new Date(),
    },
    create: {
      userId,
      corpId,
      my_compare_corp: 1,
    },
  });
  return optionCountMy;
}

export async function getCompareSetCorp({
  offset,
  limit,
  order,
  search,
  userId,
}) {
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
  const myCompare = await prisma.my_compare_corp.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    select: {
      corpId: true,
    },
  });
  const corpIds = myCompare.map((c) => c.corpId);
  let where = {
    id: {
      notIn: corpIds,
    },
  };

  if (search && search.trim()) {
    where = {
      ...where,
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
  //나의 기업 비교 기업 조회시에 확인을 위해 세팅
  const compareCorps = await prisma.corp.findMany({
    where,
    orderBy: [orderBy, { created_at: "desc" }],
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      id: true,
      corp_name: true,
      corp_tag: true,
    },
  });

  return compareCorps;
}

//비교 기업 + 전체 기업 조회 -> 나의 기업에서 선택 버튼 누르면 어차피
//비교 기업 테이블에 없으면 생성 있으면 isDelete를 조회해서 세팅함
export async function getCompare({ offset, limit, order, search, userId }) {
  const corps = await listCorpinCompare({ offset, limit, order, search });

  const compare = await prisma.compare_corp.findMany({
    where: {
      userId,
      isDelete: false,
    },
    orderBy: { created_at: "desc" },
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      corpId: true,
      corp: {
        select: {
          id: true,
          corp_name: true,
          corp_tag: true,
        },
      },
    },
  });

  return { compare, corps };
}

//나의 기업 + 전체 기업 조회 -> 나의 기업에서 선택 버튼 누르면 어차피
//나의 기업 테이블에 없으면 생성 있으면 isDelete를 조회해서 세팅함
export async function getMyCompare({ offset, limit, order, search, userId }) {
  const corps = await getCompareSetCorp({
    offset,
    limit,
    order,
    search,
    userId,
  });

  const compare = await prisma.my_compare_corp.findMany({
    where: {
      userId,
    },
    orderBy: { created_at: "desc" },
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      corpId: true,
      corp: {
        select: {
          id: true,
          corp_name: true,
          corp_tag: true,
        },
      },
    },
  });

  return { compare, corps };
}

//gt는 0인지 확인용 decrement는 1 감소
//비교기업 삭제
export async function deleteCompareCorp(userId) {
  // await getCorpinCompare(corpId)

  const compare = await prisma.compare_corp.updateMany({
    where: {
      userId,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
      updated_at: new Date(),
    },
  });

  // const optionCount = await prisma.option_count.updateMany({
  //   where: {
  //     userId,
  //     corpId,
  //     compare_corp: { gt:0 }
  //   },
  //   data: {
  //     compare_corp: { decrement: 1 },
  //     updated_at: new Date()
  //   },
  // });

  return { compare };
}

// 나의 기업 태그에서 삭제 시에
export async function deleteMyCompareCorp(userId) {
  // await getCorpinCompare(corpId)

  const compare = await prisma.my_compare_corp.updateMany({
    where: {
      userId,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
      updated_at: new Date(),
    },
  });

  // const optionCount = await prisma.option_count.updateMany({
  //   where: {
  //     userId,
  //     corpId,
  //     my_compare_corp: { gt:0 }
  //   },
  //   data: {
  //     my_compare_corp: { decrement: 1 },
  //     updated_at: new Date()
  //   },
  // });

  return { compare };
}

//나의 기업 id 검색해서 지우기
export async function deleteMyCompareandOptionCount(userId, corpId) {
  await getCorpinCompare(userId, corpId);
  // userid는 로그인 기능 제작할지 모르므로 일단 db에 저장한 id 세팅
  const compare = await prisma.my_compare_corp.updateMany({
    where: {
      userId,
      corpId,
      isDelete: false,
    },
    data: {
      isDelete: true,
      updated_at: new Date(),
    },
  });
  //횟수 테이블에서 데이터를 보내기 위해
  return compare;
}

// 비교 기업 id 검색해서 지우기
export async function deleteCompareandOptionCount(userId, corpId) {
  await getCorpinCompare(userId, corpId);
  // userid는 로그인 기능 제작할지 모르므로 일단 db에 저장한 id 세팅
  const compare = await prisma.compare_corp.updateMany({
    where: {
      userId,
      corpId,
      isDelete: false,
    },
    data: {
      isDelete: true,
      updated_at: new Date(),
    },
  });
  //횟수 테이블에서 데이터를 보내기 위해
  return compare;
}

export async function getMyCompareAndMyCompare(userId) {
  const [compare, myCompare] = await Promise.all([
    prisma.my_compare_corp.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      select: {
        corpId: true,
      },
    }),

    prisma.compare_corp.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      select: {
        corpId: true,
      },
    }),
  ]);

  const myCompareId = myCompare.map((r) => r.corpId).filter(Boolean);
  const compareId = compare.map((r) => r.corpId).filter(Boolean);

  const corpId = myCompareId.concat(compareId);

  return corpId;
}

export async function getRankingCompare({ offset, limit, order }) {
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

  const corpId = await getMyCompareAndMyCompare(userId);
  if (!corpId.length) return [];

  const compareCorps = await prisma.corp.findMany({
    where: { id: { in: corpId } },
    orderBy: [orderBy, { created_at: "desc" }],
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      id: true,
      corp_name: true,
      corp_tag: true,
      total_investment: true,
      corp_sales: true,
      employee: true,
    },
  });

  const rankingCorp = await prisma.corp.findMany({
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

  return compareCorps.map((c) => ({
    ...c,
    investment_rank: rankMap.get(c.id) ?? null,
  }));
}

export async function getOrderCompare({ offset, limit, order }) {
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

  const corpId = await getMyCompareAndMyCompare();
  if (!corpId.length) return [];

  const compareCorps = await prisma.corp.findMany({
    where: { id: { in: corpId } },
    orderBy: [orderBy, { created_at: "desc" }],
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      id: true,
      corp_name: true,
      corp_tag: true,
      total_investment: true,
      corp_sales: true,
      employee: true,
    },
  });

  return compareCorps;
}

export async function getTotalCompare({ offset, limit, order, userId }) {
  const compareRank = await getRankingCompare({ offset, limit, order, userId });
  const comapreOrder = await getOrderCompare({ offset, limit, order, userId });

  return { compareRank, comapreOrder };
}
