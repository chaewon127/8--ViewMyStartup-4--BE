import helmet from "helmet";
import cors from "cors";

export const securityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors());
};

/* 서버 전반의 보안 설정을 담당
예시:
CORS 설정 (cors 미들웨어)
Helmet 적용 (HTTP 헤더 보안)
요청 데이터 검증, rate limiting
JWT 등 인증 토큰 검증 미들웨어 포함 가능*/
