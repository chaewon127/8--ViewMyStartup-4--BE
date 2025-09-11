// const Investment = [
//   {
//     id: "eeee1111-aaaa-bbbb-cccc-000000000001",
//     accountId: "account-0001",
//     amount: 1000000,
//     amount_comment: "초기 투자",
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "eeee1111-aaaa-bbbb-cccc-000000000002",
//     accountId: "account-0002",
//     amount: 500000,
//     amount_comment: "추가 투자",
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "eeee1111-aaaa-bbbb-cccc-000000000003",
//     accountId: null, // account 미지정
//     amount: 750000,
//     amount_comment: "임시 기록",
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "eeee1111-aaaa-bbbb-cccc-000000000004",
//     accountId: "account-0003",
//     amount: 200000,
//     amount_comment: "소액 투자",
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "eeee1111-aaaa-bbbb-cccc-000000000005",
//     accountId: "account-0001",
//     amount: 1200000,
//     amount_comment: "재투자",
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
// ];

// export default Investment;

const generateMockInvestment = (count = 60) => {
  const investments = [];
  for (let i = 1; i <= count; i++) {
    investments.push({
      id: `inv-${i}`,
      user_id: `user-${String(i).padStart(4, "0")}`,
      corp_id: `11111111-aaaa-bbbb-cccc-${String(i).padStart(12, "0")}`,
      amount: BigInt(Math.floor(Math.random() * 50_000_000) + 1_000_000),
      created_at: new Date(),
      updated_at: new Date(),
      total: count,
    });
  }
  return investments;
};

const Investment = generateMockInvestment(60);
export default Investment;
