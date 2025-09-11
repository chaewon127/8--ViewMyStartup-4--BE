// const OptionCount = [
//   {
//     id: "aaaa1111-bbbb-cccc-dddd-000000000001",
//     userId: "1a2b3c4d-1111-2222-3333-444455556666", // 김연우
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     my_compare_corp: 3,
//     compare_corp: 5,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "aaaa1111-bbbb-cccc-dddd-000000000002",
//     userId: "2b3c4d5e-1111-2222-3333-444455556666", // 이유지
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     my_compare_corp: 1,
//     compare_corp: 2,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "aaaa1111-bbbb-cccc-dddd-000000000003",
//     userId: "3c4d5e6f-1111-2222-3333-444455556666", // 안다혜
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     my_compare_corp: 0,
//     compare_corp: 7,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "aaaa1111-bbbb-cccc-dddd-000000000004",
//     userId: "4d5e6f70-1111-2222-3333-444455556666", // 신희성
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     my_compare_corp: 4,
//     compare_corp: 1,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "aaaa1111-bbbb-cccc-dddd-000000000005",
//     userId: "5e6f7081-1111-2222-3333-444455556666", // 이용섭
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     my_compare_corp: 0,
//     compare_corp: 0,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
// ];

// export default OptionCount;

// Compare_corp용

import User from "./mockUser.js";

const generateMockOptionCount = (count = 60) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const user = User[i % User.length];

    arr.push({
      id: `opt-${i}`,
      userId: user.id,
      corpId: `11111111-aaaa-bbbb-cccc-${String(i + 1).padStart(12, "0")}`,
      my_compare_corp: Math.floor(Math.random() * 50) + 10,
      compare_corp: Math.floor(Math.random() * 50) + 10,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return arr;
};

const Option_count = generateMockOptionCount(60);
export default Option_count;
