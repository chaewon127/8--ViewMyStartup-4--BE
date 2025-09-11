import express from "express";
import cors from "cors";
import { DATABASE_URL } from "./src/config/env.js";
import investmentRouter from "./src/routes/investmentRoute.js";
import { router as corpRouter } from "./src/routes/corpRoute.js";
import { router as compareTotalRouter } from "./src/routes/compareTotalRoute.js";
import { router as compareRouter } from "./src/routes/compareRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger/swagger.js";
import cron from "node-cron";
import morgan from "morgan";

//투자금 등등은 너무 커서 BigInt 로 세팅한거 조회하기 위한 작업
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();

//cors 오류 방지 - 모든 도메인 허용
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

//Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// cron - /health 엔드포인트 추가
app.get("/health", (req, res) => {
  res.status(200).json({ status: "alive" });
});

app.use("/corp", corpRouter);
app.use("/corpTotals", compareTotalRouter);
app.use("/compare", compareRouter);
app.use("/investments", investmentRouter);

//cron 스케쥴러 - 10분에 한 번씩
cron.schedule("*/10 * * * *", async () => {
  try {
    const response = await fetch(
      "https://eight-viewmystartup-4-be.onrender.com/health"
    );
    console.log(
      `[${new Date().toISOString()}] Ping sent, status: ${response.status}`
    );
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Ping failed:`, error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api-docs`);
});
