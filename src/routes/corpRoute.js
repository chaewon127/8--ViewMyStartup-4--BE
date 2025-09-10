import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  listCorpController,
  getCorpController,
} from "../controllers/corpController.js";

// exprot 변수 이런식으로 보내면 app.js 에서
// import { router as corps } from './route/corpRoute.js';
// app.use(corps);
// 이런식으로 실행 가능
export const router = Router();

/**
 * @openapi
 * /corp:
 *   get:
 *     summary: 기업 목록 조회
 *     tags:
 *       - Corp
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
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [investmentLowest, investmentHighest, salesLowest, salesHighest, employeeLowest, employeeHighest]
 *           default: investment_desc
 *         description: 정렬 기준
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: 기업 이름 또는 태그 검색
 *     responses:
 *       '200':
 *         description: 기업 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Corp'
 */
router.get("/corp", asyncHandler(listCorpController));

/**
 * @openapi
 * /corp/{id}:
 *   get:
 *     summary: 기업 상세 조회
 *     tags:
 *       - Corp
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID
 *     responses:
 *       '200':
 *         description: 기업 상세 정보와 투자 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 corp_name:
 *                   type: string
 *                 corp_tag:
 *                   type: string
 *                 corp_sales:
 *                   type: number
 *                 employee:
 *                   type: integer
 *                 total_investment:
 *                   type: number
 *                 investments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       User:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *       '404':
 *         description: 기업을 찾을 수 없음
 */
router.get("/corp/:id", asyncHandler(getCorpController));
