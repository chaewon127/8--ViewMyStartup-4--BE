import express from "express";
import investmentController from "../controllers/investmentController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/**
 * @openapi
 * /investment/investments:
 * get:
 * summary: 투자 리스트 조회
 * tags: [Investment]
 * responses:
 * 200:
 * description: 투자 리스트
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Investment'
 */
router.get("/investments", asyncHandler(investmentController.getInvestments));

/**
 * @openapi
 * /investment/corp/{id}:
 * get:
 * summary: 특정 기업 투자 댓글 조회
 * tags: [Investment]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: 댓글 리스트
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Comment'
 */
router.get(
  "/corp/:id",
  asyncHandler(investmentController.getInvestmentComments)
);

router.post(
  "/corp/:id",
  asyncHandler(investmentController.createInvestmentComment)
);
router.patch(
  "/corp/:id",
  asyncHandler(investmentController.updateInvestmentComment)
);
router.delete(
  "/corp/:id",
  asyncHandler(investmentController.deleteInvestmentComment)
);

// router.post("/account", investmentController.saveAccount);

export default router;
