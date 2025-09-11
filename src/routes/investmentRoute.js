import express from "express";
import investmentController from "../controllers/investmentController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/**
 * @openapi
 * /investments:
 *   get:
 *     summary: 투자 리스트 조회
 *     tags:
 *       - Investment
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 페이지 시작 오프셋
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 한 페이지당 데이터 수
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [virtual, real]
 *           default: virtual
 *         description: 정렬 기준
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [Highest, Lowest]
 *           default: Highest
 *         description: 정렬 순서
 *     responses:
 *       '200':
 *         description: 투자 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Investment'
 */
router.get("/investments", asyncHandler(investmentController.getInvestments));

/**
 * @openapi
 * /corp/{id}/comments:
 *   get:
 *     summary: 특정 기업 투자 댓글 조회
 *     tags:
 *       - Investment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 페이지 시작 오프셋
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *         description: 한 페이지당 댓글 수
 *     responses:
 *       '200':
 *         description: 댓글 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 investmentComments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Investment'
 */
router.get(
  "/corp/:id/comments",
  asyncHandler(investmentController.getInvestmentComments)
);

/**
 * @openapi
 * /corp/{id}/comments:
 *   post:
 *     summary: 특정 기업 투자 댓글 작성
 *     tags:
 *       - Investment
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
 *             required:
 *               - name
 *               - amount
 *               - amount_comment
 *               - password
 *               - passwordConfirm
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               comment:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       '201':
 *         description: 댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 investmentComment:
 *                   $ref: '#/components/schemas/Comment'
 */
router.post(
  "/corp/:id/comments",
  asyncHandler(investmentController.createInvestmentComment)
);

/**
 * @openapi
 * /corp/{id}/comments:
 *   patch:
 *     summary: 특정 기업 투자 댓글 수정
 *     tags:
 *       - Investment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 투자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount_comment
 *               - password
 *             properties:
 *               comment:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 investmentComment:
 *                   $ref: '#/components/schemas/Comment'
 */
router.patch(
  "/corp/:id/comments",
  asyncHandler(investmentController.updateInvestmentComment)
);

/**
 * @openapi
 * /corp/{id}/comments:
 *   delete:
 *     summary: 특정 기업 투자 댓글 삭제
 *     tags:
 *       - Investment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 투자 ID
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 삭제용 비밀번호
 *     responses:
 *       '200':
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
  "/corp/:id/comments",
  asyncHandler(investmentController.deleteInvestmentComment)
);

// router.post("/account", investmentController.saveAccount);

export default router;
