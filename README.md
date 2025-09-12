README.md
# View My Startup

## 불사조

팀 노션: [원문 제공 링크 (확인 필요)](https://www.notion.so/257055487fec81ad9458f8c6849b2f6e?v=257055487fec81818b38000c2e3c88e2&source=copy_link)

### 팀원 구성
- 황채원
- 홍명주
- 최송이
- 김연만
- 곽민준

### 프로젝트 소개
- 스타트업 정보 확인 및 모의 투자 서비스
- 최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다. 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다. 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다.

### 기간
2025.08.26~2025.09.12

### 기술 스택
- Frontend: JavaScript, React.js, scss
- Backend: Express.js, PrismaORM
- Database: PostgreSQL
- 공통 Tool: Git & Github, Discord, Notion


### 팀원별 구현 기능 상세
황채원
- DB 스키마 마이그레이션
- 투자 API 기능(투자 현황 조회, 투자 댓글 CRUD)
- 로그인/회원가입 API 기능
- 스웨거 문서 작성 및 오류 해결
<img width="1439" height="2864" alt="스웨거 문서" src="https://github.com/user-attachments/assets/185bc163-2b86-4217-b1c2-be016a147b50" />
<img width="1439" height="2048" alt="DB" src="https://github.com/user-attachments/assets/3b38f194-9c90-4dfa-afdc-1af892b69b88" />

홍명주
- 나의 기업 비교하기 페이지 개발
- 기업 선택 모달 개발
- 공용 DropDown, Pagenation Controller 컴포넌트 개발
<img width="1439" height="1856" alt="나의 기업 비교하기 페이지" src="https://github.com/user-attachments/assets/1ef72973-3a23-49c9-895e-9e4dbfb57db1" />
<img width="1439" height="990" alt="나의 기업 선택하기 모달" src="https://github.com/user-attachments/assets/b17b3027-727e-4f5d-b7d7-3faaae2d4148" />
<img width="1439" height="877" alt="비교 기업 선택하기 모달" src="https://github.com/user-attachments/assets/f9d4cf70-4051-4c16-94b6-03888f7cd6b6" />


최송이
- 비교 현황 및 투자 현황 페이지 개발
- 반응형 디자인
- 공용 SerchBar 및 Header 개발
- 기업 리스트 및 기업 상세 페이지 개발
<img width="1439" height="1046" alt="비교 현황 페이지" src="https://github.com/user-attachments/assets/fd082a75-e3ef-4a73-b68d-01cbda965590" />
<img width="1439" height="1046" alt="투자 현황 페이지" src="https://github.com/user-attachments/assets/12a60b05-de84-429b-9cac-1c6f12bd6687" />
<img width="1439" height="1129" alt="기업 리스트 페이지" src="https://github.com/user-attachments/assets/e77f2cc7-bc50-455a-8fc8-664e11e60e07" />
<img width="1439" height="925" alt="기업 상세 페이지" src="https://github.com/user-attachments/assets/02ffdcec-a62f-4244-b88b-7e4a29dc9e97" />

김연만
- ERD 분석 및 설계
- 기업 API 기능
<img width="1053" height="528" alt="ERD" src="https://github.com/user-attachments/assets/3fcbd200-6d5c-4d85-9296-a895ee3fbb51" />

곽민준
- 기업 리스트 페이지 및 기업 상세 페이지
- 투자하기 모달
<img width="1092" height="904" alt="투자하기 모달" src="https://github.com/user-attachments/assets/dd51b9bc-97cb-4b1a-81ac-ef36ae8d15fe" />

### 파일 구조 (요약)
- 프론트
<pre> ```
src/
├─ assets/            // 이미지, 폰트 등 정적 리소스
├─ components/        // 공통 UI 컴포넌트
│  ├─ Layout/         // 레이아웃 관련 컴포넌트
│  │  └─ index.jsx + Layout.module.css
│  ├─ Button/         // 버튼 관련 컴포넌트
│  │  └─ 여러 버튼 컴포넌트 + Button.module.css
│  └─ ...             // 기타 재사용 가능한 컴포넌트
│
├─ pages/             // 페이지 단위 컴포넌트
│  ├─ Home/
│  │  └─ index.jsx + Home.module.css
│  ├─ Login/
│  ├─ CompanyDetail/
│  └─ ...             // 추가 페이지
│
├─ hooks/             // 커스텀 훅
├─ utils/             // 공통 유틸 함수
├─ api/               // API 호출 및 서비스 함수
├─ styles/            // 글로벌 CSS
│  └─ global.css
├─ main.jsx           // 엔트리 포인트
└─ App.jsx            // 루트 컴포넌트
``` </pre>

- 백엔드

<pre> ```
src/
├─ config/                 
│  ├─ env.js               # 환경변수
│  └─ prisma.js            # PrismaClient
├─ services/               # 비즈니스 로직
│  ├─ userService.js
│  ├─ corpService.js
│  └─ investmentService.js
├─ controllers/            # API 요청/응답 처리
│  ├─ userController.js
│  ├─ corpController.js
│  └─ investmentController.js
├─ routes/                 # 라우트 정의
│  ├─ userRoutes.js
│  ├─ corpRoutes.js
│  └─ investmentRoutes.js
├─ middlewares/            # 보안/에러 처리
│  ├─ auth.js
│  ├─ asyncHandler.js
│  ├─ securityMiddleware.js # helmet, rate limit
│  └─ errorHandler.js
├─ validations/            # superstruct 요청 검증
│  ├─ userValidation.js
│  └─ corpValidation.js
├─ swagger/                # swagger 문서 작성
│  └─ swagger.js
└─ app.js                  # Express 앱 초기화
``` </pre>

구현 홈페이지
- 프론트: https://8-view-my-startup-4-fe.vercel.app/
- 백엔드: https://eight-viewmystartup-4-be.onrender.com/api-docs/

프로젝트 회고록 / 참고 레포
- 프론트 레포: https://github.com/chaewon127/8--ViewMyStartup-4--FE
- 회고록: 4팀_ViewMyStartup_발표자료.pdf 참고고
