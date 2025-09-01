import express from "express";
import investmentController from "../controllers/investmentController.js";
// import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/* 추후 조회 URL 경로 수정할지도: 투자현황(기업 리스트)->기업 상세 조회(코멘트 리스트)->코멘트 상세 조회 
feature-asyncHandler 브랜치에서 코드 작성 후 merge/rebase -> asyncHandler 함수 적용하기*/

router.get("/investments", investmentController.getInvestments);
router.get("/investments/:id", investmentController.getInvestmentById);
router.post("/investments", investmentController.createInvestment);
router.patch("/investments/:id", investmentController.updateInvestment);
router.delete("/investments/:id", investmentController.deleteInvestment);

export default router;
