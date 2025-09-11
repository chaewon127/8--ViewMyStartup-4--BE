// const Corp = [
//   {
//     id: "11111111-aaaa-bbbb-cccc-000000000001",
//     corp_name: "코드잇",
//     corp_tag: "에듀테크",
//     corp_profile: "Leading AI and cloud solutions provider.",
//     total_investment: BigInt(500000000),
//     corp_sales: BigInt(1200000000),
//     employee: 250,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "11111111-aaaa-bbbb-cccc-000000000002",
//     corp_name: "메스프레소",
//     corp_tag: "에듀테크",
//     corp_profile: "Renewable energy company focusing on solar and wind.",
//     total_investment: BigInt(300000000),
//     corp_sales: BigInt(800000000),
//     employee: 150,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "11111111-aaaa-bbbb-cccc-000000000003",
//     corp_name: "뤼이드",
//     corp_tag: "에듀테크",
//     corp_profile: "Biotech startup innovating personalized medicine.",
//     total_investment: BigInt(450000000),
//     corp_sales: BigInt(600000000),
//     employee: 120,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "11111111-aaaa-bbbb-cccc-000000000004",
//     corp_name: "앨리스",
//     corp_tag: "에듀테크",
//     corp_profile: "Fintech firm providing blockchain-based payment solutions.",
//     total_investment: BigInt(200000000),
//     corp_sales: BigInt(400000000),
//     employee: 80,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "11111111-aaaa-bbbb-cccc-000000000005",
//     corp_name: "팀스파르타",
//     corp_tag: "에듀테크",
//     corp_profile: "Edtech platform offering AI-driven learning tools.",
//     total_investment: BigInt(150000000),
//     corp_sales: BigInt(250000000),
//     employee: 60,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
// ];

// export default Corp;

const generateMockCorps = (count = 60) => {
  const corpNames = [
    "코드잇",
    "메스프레소",
    "뤼이드",
    "앨리스",
    "팀스파르타",
    "스마티",
    "에듀랩",
    "넥스트코드",
    "코딩캣",
    "브레인업",
  ];
  const corpTags = ["에듀테크"];

  const corps = [];

  for (let i = 1; i <= count; i++) {
    const name = corpNames[i % corpNames.length] + ` ${i}`;
    const tag = corpTags[i % corpTags.length];
    corps.push({
      id: `11111111-aaaa-bbbb-cccc-${String(i).padStart(12, "0")}`,
      corp_name: name,
      corp_tag: tag,
      corp_profile: `코드잇은 ‘온라인 코딩 교육 서비스’를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...`,
      total_investment: BigInt(
        Math.floor(Math.random() * 500_000_000) + 100_000_000
      ),
      corp_sales: BigInt(
        Math.floor(Math.random() * 1_500_000_000) + 200_000_000
      ),
      employee: Math.floor(Math.random() * 300) + 20,
      created_at: new Date(),
      updated_at: new Date(),
      total: count,
    });
  }

  return corps;
};

const Corp = generateMockCorps(60);

export default Corp;
