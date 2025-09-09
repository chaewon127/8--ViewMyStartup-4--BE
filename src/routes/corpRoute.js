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
 *     responses:
 *       200:
 *         description: 성공적으로 반환
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
 *     responses:
 *       200:
 *         description: 성공적으로 반환
 *       404:
 *         description: 기업을 찾을 수 없음
 */
router.get("/corp/:id", asyncHandler(getCorpController));
