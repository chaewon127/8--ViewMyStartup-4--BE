import express from "express";
import investmentController from "../controllers/investmentController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/**
 * @openapi
 * /investment/investments:
 *  get:
 *    summary: 투자 리스트 조회
 *    tags: [Investment]
 *    responses:
 *      200:
 *        description: 투자 리스트
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Investment'
 */
router.get("/investments", asyncHandler(investmentController.getInvestments));

/**
 * @openapi
 * /investment/corp/{id}:
 *  get:
 *    summary: 특정 기업 투자 댓글 조회
 *    tags: [Investment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 댓글 리스트
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Comment'
 */
router.get(
  "/corp/:id",
  asyncHandler(investmentController.getInvestmentComments)
);

/**
 * @openapi
 * /investment/corp/{id}:
 *   post:
 *     summary: 특정 기업 투자 댓글 작성
 *     tags: [Investment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "이 기업은 성장 가능성이 높습니다."
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 */
router.post(
  "/corp/:id",
  asyncHandler(investmentController.createInvestmentComment)
);

/**
 * @openapi
 * /investment/corp/{id}:
 *   patch:
 *     summary: 특정 기업 투자 댓글 수정
 *     tags: [Investment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "수정된 댓글 내용"
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 */
router.patch(
  "/corp/:id",
  asyncHandler(investmentController.updateInvestmentComment)
);

/**
 * @openapi
 * /investment/corp/{id}:
 *   delete:
 *     summary: 특정 기업 투자 댓글 삭제
 *     tags: [Investment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 */
router.delete(
  "/corp/:id",
  asyncHandler(investmentController.deleteInvestmentComment)
);

// router.post("/account", investmentController.saveAccount);

export default router;
