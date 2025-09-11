// const Account = [
//   {
//     id: "account-0001",
//     userId: "1a2b3c4d-1111-2222-3333-444455556666", // 김연우
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "account-0002",
//     userId: "2b3c4d5e-1111-2222-3333-444455556666", // 이유지
//     corpId: "11111111-aaaa-bbbb-cccc-000000000002", // 메스프레소
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "account-0003",
//     userId: "3c4d5e6f-1111-2222-3333-444455556666", // 안다혜
//     corpId: null, // corp 미지정
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "account-0004",
//     userId: null, // user 미지정
//     corpId: "11111111-aaaa-bbbb-cccc-000000000004", // 앨리스
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "account-0005",
//     userId: "5e6f7081-1111-2222-3333-444455556666", // 이용섭
//     corpId: "11111111-aaaa-bbbb-cccc-000000000005", // 팀스파르타
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
// ];

// export default Account;

const generateMockAccounts = (count = 60) => {
  const accounts = [];
  for (let i = 1; i <= count; i++) {
    accounts.push({
      id: `acc-${String(i).padStart(4, "0")}`,
      user_id: `user-${String(i).padStart(4, "0")}`,
      corp_id: `11111111-aaaa-bbbb-cccc-${String(i).padStart(12, "0")}`,
      balance: BigInt(Math.floor(Math.random() * 100_000_000) + 1_000_000),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return accounts;
};

const Account = generateMockAccounts(60);
export default Account;
