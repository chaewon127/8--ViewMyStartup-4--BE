// const MyCompareCorp = [
//   {
//     id: "dddd1111-aaaa-bbbb-cccc-000000000001",
//     userId: "1a2b3c4d-1111-2222-3333-444455556666", // 김연우
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "dddd1111-aaaa-bbbb-cccc-000000000002",
//     userId: "2b3c4d5e-1111-2222-3333-444455556666", // 이유지
//     corpId: "11111111-aaaa-bbbb-cccc-000000000002", // 메스프레소
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "dddd1111-aaaa-bbbb-cccc-000000000003",
//     userId: "3c4d5e6f-1111-2222-3333-444455556666", // 안다혜
//     corpId: null, // corp 미지정
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "dddd1111-aaaa-bbbb-cccc-000000000004",
//     userId: "4d5e6f70-1111-2222-3333-444455556666", // 신희성
//     corpId: null, // corp 미지정
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: true, // soft delete 예시
//   },
//   {
//     id: "dddd1111-aaaa-bbbb-cccc-000000000005",
//     userId: "5e6f7081-1111-2222-3333-444455556666", // 이용섭
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
// ];

// export default MyCompareCorp;

import User from "./mockUser.js";

const generateMockMyCompare = (count = 60) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const user = User[i % User.length];

    arr.push({
      id: `mycmp-${i}`,
      userId: user.id,
      corpId: `corp-${i + 1}`,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return arr;
};

const My_compare_corp = generateMockMyCompare(60);
export default My_compare_corp;
