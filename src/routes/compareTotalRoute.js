import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getCorpTotalController } from "../controllers/compareTotalController.js";

export const router = Router();

/**
 * @openapi
 * /corpTotals:
 *   get:
 *     summary: 전체 기업 비교 데이터 조회
 *     tags:
 *       - Compare Total
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
 *           enum: [myCompareLowest, myCompareHighest, compareLowest, compareHighest, createdDesc]
 *           default: createdDesc
 *         description: 정렬 기준
 *     responses:
 *       '200':
 *         description: 전체 기업 비교 데이터를 성공적으로 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 corps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       corp_name:
 *                         type: string
 *                       corp_tag:
 *                         type: string
 *                       corp_profile:
 *                         type: string
 *                       my_compare_total:
 *                         type: integer
 *                       compare_total:
 *                         type: integer
 *                 total:
 *                   type: integer
 */
router.get("/", asyncHandler(getCorpTotalController));
