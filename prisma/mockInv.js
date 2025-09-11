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

import bcrypt from "bcrypt";
import User from "./mockUser.js";
import Account from "./mockAccount.js";

const generateMockInvestment = (count = 60) => {
  const comments = ["코드잇 투자", "초기 투자", "소액 투자", "재투자"];

  const investments = [];
  for (let i = 0; i < count; i++) {
    const user = User[i % User.length];
    const account = Account[i];

    // const hashedPassword = await bcrypt.hash("1234", 10);

    investments.push({
      id: `inv-${i}`,
      userId: user.id,
      corpId: `corp-${i + 1}`,
      accountId: account.id,
      name: user.name,
      password: "1234",
      amount: Math.floor(Math.random() * 50_000_000) + 1_000_000,
      amount_comment: comments[i % comments.length],
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return investments;
};

const Investment = generateMockInvestment(60);
export default Investment;
