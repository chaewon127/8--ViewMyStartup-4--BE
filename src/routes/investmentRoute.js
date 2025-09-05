import express from "express";
import investmentController from "../controllers/investmentController.js";
// import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/*feature-asyncHandler 브랜치에서 코드 작성 후 merge/rebase -> asyncHandler 함수 적용하기
논의 후 URL 변경
  * GET /corp/:id -> 기업 상세 페이지에 코멘트 리스트가 포함
  * POST /investments -> 기업 비교 결과 페이지에서 투자하기 버튼을 클릭하면 나오는 모달
  * PATCH, Delete /corp/:id -> ,GET /corp/:id와 같음
  * POST /investments/:id -> 투자 테이블의 내용을 기록하는게 투자 기록이라 같이 CRUD... 이해 못함..
*/

router.get("/investment", investmentController.getInvestments);
router.get("/corp/:id", investmentController.getInvestmentComments);
// router.get("/investments/:id", investmentController.getInvestmentById);
router.post("/", investmentController.createInvestmentComment);
router.patch("/corp/:id", investmentController.updateInvestmentComment);
router.delete("/corp/:id", investmentController.deleteInvestmentComment);
router.post("/", investmentController.saveAccount);

export default router;
