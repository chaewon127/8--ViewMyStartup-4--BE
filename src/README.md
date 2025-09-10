model Compare_corp {
  ... (생략)
  // 아래 이거 붙여줘야 작동함
  @@unique([userId, corpId])
}

model My_compare_corp {
  ... (생략)
  // 아래 이거 붙여줘야 작동함
  @@unique([userId, corpId]) 
}

model Option_count {
  ... (생략)
  // 아래 이거 붙여줘야 작동함
  @@unique([userId, corpId])
}

위의 세 DB에 추가해 주길 바람 퀴리 받아오는 과정에서 작동을 편하게 하기 위해 세팅하는 부분
이거 안하면 .$queryRaw로 직접 조인문 짜야해서 빡세서 세팅 필요함.


추가적으로 
app.js 부분 맨위에 
BigInt.prototype.toJSON = function () { 
  return this.toString(); 
};
이거 필요

우선 swwagger UI 붙이고 전체 목록 조회에 대한 검색 기능 추가 
search=기업 -> 기업테이블에서 기업이 들어간 기업이름, 태그에서 검색
