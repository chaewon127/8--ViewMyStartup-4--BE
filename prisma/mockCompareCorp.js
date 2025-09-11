// const CompareCorp = [

//   {
//     id: "cccc1111-aaaa-bbbb-cccc-000000000001",
//     userId: "1a2b3c4d-1111-2222-3333-444455556666", // 김연우
//     corpId: "11111111-aaaa-bbbb-cccc-000000000001", // 코드잇
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "cccc1111-aaaa-bbbb-cccc-000000000002",
//     userId: "2b3c4d5e-1111-2222-3333-444455556666", // 이유지
//     corpId: "11111111-aaaa-bbbb-cccc-000000000002", // 메스프레소
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "cccc1111-aaaa-bbbb-cccc-000000000003",
//     userId: "3c4d5e6f-1111-2222-3333-444455556666", // 안다혜
//     corpId: "11111111-aaaa-bbbb-cccc-000000000003", // 뤼이드
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
//   {
//     id: "cccc1111-aaaa-bbbb-cccc-000000000004",
//     userId: "4d5e6f70-1111-2222-3333-444455556666", // 신희성
//     corpId: "11111111-aaaa-bbbb-cccc-000000000004", // 앨리스
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: true, // soft delete 예시
//   },
//   {
//     id: "cccc1111-aaaa-bbbb-cccc-000000000005",
//     userId: "5e6f7081-1111-2222-3333-444455556666", // 이용섭
//     corpId: "11111111-aaaa-bbbb-cccc-000000000005", // 팀스파르타
//     created_at: new Date(),
//     updated_at: new Date(),
//     isDeleted: false,
//   },
// ];

// export default CompareCorp;

// Compare_corp용

const generateMockCompare = (count = 60) => {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: `cmp-${i}`,
      user_id: `user-${String(i).padStart(4, "0")}`,
      corp_id: `11111111-aaaa-bbbb-cccc-${String(i).padStart(12, "0")}`,
      select_count: Math.floor(Math.random() * 50) + 10,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return arr;
};

const Compare_corp = generateMockCompare(60);
export default Compare_corp;
