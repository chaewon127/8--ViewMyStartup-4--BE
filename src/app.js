import express from "express";
import cors from "cors";
import { DATABASE_URL } from "./config/env.js";
import { router as investmentRouter } from "./routes/investmentRoute.js";
import { router as corpRouter } from "./routes/corpRoute.js";
import { router as compareTotalRouter } from "./routes/compareTotalRoute.js";
import { router as compareRouter } from "./routes/compareRoute.js";

//투자금 등등은 너무 커서 BigInt 로 세팅한거 조회하기 위한 작업
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();

app.use(cors());
app.use(express.json());

//Swagger UI
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use("/corp", corpRouter);
app.use("/corpTotals", compareTotalRouter);
app.use("/compare", compareRouter);
app.use("/investments", investmentRouter);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log("Server Started"));
