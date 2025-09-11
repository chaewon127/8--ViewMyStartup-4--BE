import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getCorpTotalController } from '../controllers/compareTotalController.js'



export const router = Router();

/**
 * @openapi
 * /corpTotals:
 *   get:
 *     summary: 전체 기업 비교 데이터 조회
 *     tags:
 *       - Compare Total
 *     responses:
 *       200:
 *         description: 전체 기업 비교 데이터를 성공적으로 반환
 */
router.get('/corpTotals', asyncHandler(getCorpTotalController));