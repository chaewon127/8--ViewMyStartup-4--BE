export const User = [
  {
    user_id: "U001",
    name: "김민수",
    email: "minsu@example.com",
    password: "hashed_pw1",
    gender: "M",
    birth: new Date("1995-06-15T00:00:00Z"),
    isDeleted: false,
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
  {
    user_id: "U002",
    name: "이영희",
    email: "younghee@example.com",
    password: "hashed_pw2",
    gender: "F",
    birth: new Date("1998-11-20T00:00:00Z"),
    isDeleted: false,
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];

export const Investment = [
  {
    investment_id: "I001",
    account_id: "A001",
    corp_id: "C001",
    user_id: "U001",
    amount: 5000000,
    amount_comment: "초기 투자",
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];

export const Account = [
  {
    account_id: "A001",
    corp_id: "C001",
    user_id: "U001",
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];

export const Corporation = [
  {
    corp_id: "C001",
    corp_name: "코드잇",
    corp_tag: "에듀테크",
    corp_profile:
      "코드잇은 ‘온라인 코딩 교육 서비스’를 운영하는 EdTech 스타트업입니다.",
    total_investment: "10억",
    corp_sales: 1500000000,
    employee: 45,
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
  {
    corp_id: "C002",
    corp_name: "매스프레소",
    corp_tag: "에듀테크",
    corp_profile:
      "코드잇은 ‘온라인 코딩 교육 서비스’를 운영하는 EdTech 스타트업입니다.",
    total_investment: "5억",
    corp_sales: 2500000000,
    employee: 60,
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];

export const MyStartup = [
  {
    mycorp_id: "MC001",
    corp_id: "C001",
    user_id: "U001",
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];

export const CompareCorp = [
  {
    compare_id: "CC001",
    corp_id: "C001",
    user_id: "U001",
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];

export const CountCorp = [
  {
    countcorp_id: "SL001",
    corp_id: "C001",
    user_id: "U001",
    my_compare_corp: 1,
    compare_corp: 2,
    created_at: new Date("2025-09-01T01:00:00.000Z"),
    updated_at: new Date("2025-09-01T01:00:00.000Z"),
  },
];
