import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  listCorpinCompareController,
  getCorpinCompareController,
  getCompareandOptionCountController,
  getMyCompareandOptionCountController,
  getCompareController,
  getMyCompareController,
  deleteCompareCorpController,
  deleteMyCompareCorpController,
} from "../controllers/compareController.js";
import { roundToNearestHours } from "date-fns";

export const router = Router();

// 선택하기 작동시 (비교, 나의 기업) 생성 + 선택 횟수 테이블 카운터 + 1
// 만약 수정 시 isDelete를 fasle로 바꿔서 덮어쓰는 느낌으로 비교 테이블 세팅
/**
 * @openapi
 * /compare/corpinfo/{id}:
 *   post:
 *     summary: 비교 기업 선택 및 옵션 카운트
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 비교 테이블 insert 및 선택 횟수 테이블 카운트
 */
router.post(
  "/compare/corpinfo/:id",
  asyncHandler(getCompareandOptionCountController)
);

/**
 * @openapi
 * /compare/mycorpinfo/{id}:
 *   post:
 *     summary: 나의 기업 선택 및 옵션 카운트
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 나의 기업 테이블 insert 및 선택 횟수 테이블 카운트
 */
router.post(
  "/compare/mycorpinfo/:id",
  asyncHandler(getMyCompareandOptionCountController)
);

// 비교, 나의 기업 조회 시 세팅 (전체 기업 orederBy 그대로 사용 가능 + 나의 기업은)
// 전에 사용한 거 그대로 사용 가능
/**
 * @openapi
 * /compare/corpinfo:
 *   get:
 *     summary: 기업 비교 현황 조회
 *     tags:
 *       - Compare
 *     responses:
 *       200:
 *         description: 기업 비교 데이터 목록
 */
router.get("/compare/corpinfo", asyncHandler(getCompareController));

/**
 * @openapi
 * /compare/mycorpinfo:
 *   get:
 *     summary: 나의 기업 비교 현황 조회
 *     tags:
 *       - Compare
 *     responses:
 *       200:
 *         description: 나의 기업 비교 데이터 목록
 */
router.get("/compare/mycorpinfo", asyncHandler(getMyCompareController));

// 비교 현황 페이지

// 삭제 -> 사실상 수정이라 post로 보냄 isDelete를 사용함

/**
 * @openapi
 * /compare/corpinfo/{id}:
 *   delete:
 *     summary: 기업 비교 데이터 삭제
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 기업 비교 데이터 삭제 처리됨
 */
router.delete(
  "/compare/corpinfo/:id",
  asyncHandler(deleteCompareCorpController)
);

/**
 * @openapi
 * /compare/mycorpinfo/{id}:
 *   delete:
 *     summary: 나의 기업 비교 데이터 삭제
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 나의 기업 비교 데이터 삭제 처리됨
 */
router.delete(
  "/compare/mycorpinfo/:id",
  asyncHandler(deleteMyCompareCorpController)
);

// 이거 아래 안내리면 오류남 그냥 기업 조회 + 기업 선택 등
/**
 * @openapi
 * /compare:
 *   get:
 *     summary: 전체 비교 기업 목록 조회
 *     tags:
 *       - Compare
 *     responses:
 *       200:
 *         description: 전체 기업 목록 반환
 */
router.get("/compare", asyncHandler(listCorpinCompareController));

/**
 * @openapi
 * /compare/{id}:
 *   get:
 *     summary: 단일 기업 조회
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 단일 기업 반환
 *       404:
 *         description: 해당 기업을 찾을 수 없음
 */
router.get("/compare/:id", asyncHandler(getCorpinCompareController));
