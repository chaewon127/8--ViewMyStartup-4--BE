import { prisma } from "../config/prisma.js";

// 비교 현황 list
export async function getCorpTotal({
  offset = 0,
  limit = 20,
  order = "my_desc",
} = {}) {
  // 기업 조회 내가 원하는 부분만
  const corps = await prisma.corp.findMany({
    select: {
      id: true,
      corp_name: true,
      corp_profile: true,
      corp_image: true,
      corp_tag: true,
      created_at: true,
    },
  });

  //횟수 합치기 ex 1유저랑 2유저의 기록이 10번 11번 있으면 21번으로 합산
  const agg = await prisma.option_count.groupBy({
    by: ["corpId"],
    where: {
      corpId: { not: null },
    },
    _sum: {
      my_compare_corp: true,
      compare_corp: true,
    },
  });

  //합산 맵 합산할 꺼 없으면 0 보냄 merged는 그걸 병합
  const sums = new Map(
    agg.map((r) => [
      r.corpId,
      {
        my: r._sum?.my_compare_corp ?? 0,
        compare: r._sum?.compare_corp ?? 0,
      },
    ])
  );
  const merged = corps.map((c) => ({
    id: c.id,
    corp_name: c.corp_name,
    corp_tag: c.corp_tag,
    corp_profile: c.corp_profile,
    corp_image: c.corp_image,
    my_compare_total: sums.get(c.id)?.my ?? 0,
    compare_total: sums.get(c.id)?.compare ?? 0,
    created_at: c.created_at,
  }));

  const cmp =
    order === "myCompareLowest"
      ? (a, b) =>
          b.my_compare_total - a.my_compare_total || b.created_at - a.created_at
      : order === "myCompareHighest"
      ? (a, b) =>
          a.my_compare_total - b.my_compare_total || b.created_at - a.created_at
      : order === "compareLowest"
      ? (a, b) => b.compare_corp - a.compare_corp || b.created_at - a.created_at
      : order === "compareHighest"
      ? (a, b) => b.compare_corp - a.compare_corp || b.created_at - a.created_at
      : (a, b) => +b.created_at - +a.created_at;

  merged.sort(cmp);

  // 5) 페이지네이션
  const off = Math.max(0, parseInt(offset));
  const lim = Math.max(0, parseInt(limit));
  const page = merged
    .slice(off, off + lim)
    .map(({ created_at, ...rest }) => rest);

  return { corps: page, total: merged.length };
}
