import express from "express";
import cors from "cors";
import { DATABASE_URL } from "./config/env.js";
import investmentRouter from "./routes/investmentRoute.js";

//투자금 등등은 너무 커서 BigInt 로 세팅한거 조회하기 위한 작업
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();

app.use(cors());
app.use(express.json());

app.use("/investment", investmentRouter);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log("Server Started"));
