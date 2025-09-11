import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  listCorpinCompareController,
  getCorpinCompareController,
  getCompareandOptionCountController,
  getMyCompareandOptionCountController,
  postOptionCountController,
  postMyOptionCountController,
  getCompareController,
  getMyCompareController,
  deleteCompareCorpController,
  deleteMyCompareCorpController,
  getMyCompareAndMyCompareController,
  getRankingCompareController,
  getOrderCompareController,
  getTotalCompareController,
  deleteMyCompareandOptionCountController,
  deleteCompareandOptionCountController,
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
 *       '200':
 *         description: 비교 테이블 insert 및 선택 횟수 테이블 카운트
 */
router.post("/corpinfo/:id", asyncHandler(getCompareandOptionCountController));

/**
 * @openapi
 * /compare/mycorpinfo/{id}:
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
 *       '200':
 *         description: 나의 기업 테이블 insert 및 선택 횟수 테이블 카운트
 */
router.post(
  "/mycorpinfo/:id",
  asyncHandler(getMyCompareandOptionCountController)
);

/**
 * @openapi
 * /compare/optioncount/{id}:
 *   post:
 *     summary: 비교 기업 선택 수 증가
 *     description: corpId에 해당하는 레코드의 compare_corp 값을 1 증가시킵니다. 존재하지 않으면 새로 생성합니다.
 *     tags: [Compare]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID (corpId)
 *     responses:
 *       200:
 *         description: upsert 결과
 *       404:
 *         description: 기업을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.post("/optioncount/:id", asyncHandler(postOptionCountController));

/**
 * @openapi
 * /compare/myoptioncount/{id}:
 *   post:
 *     summary: 나의 기업 선택 수 증가
 *     description: corpId에 해당하는 레코드의 my_compare_corp 값을 1 증가시킵니다. 존재하지 않으면 새로 생성합니다.
 *     tags: [Compare]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID (corpId)
 *     responses:
 *       200:
 *         description: upsert 결과
 *       404:
 *         description: 기업을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.post("/myoptioncount/:id", asyncHandler(postMyOptionCountController));

// 비교, 나의 기업 조회 시 세팅 (전체 기업 orederBy 그대로 사용 가능 + 나의 기업은)
// 전에 사용한 거 그대로 사용 가능

/**
 * @openapi
 * /compare/corpinfo:
 *   get:
 *     summary: 기업 비교 현황 조회
 *     tags:
 *       - Compare
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
 *           default: investment_desc
 *         description: 정렬 기준
 *     responses:
 *       '200':
 *         description: 기업 비교 데이터 목록
 */
router.get("/corpinfo", asyncHandler(getCompareController));

/**
 * @openapi
 * /compare/mycorpinfo:
 *   get:
 *     summary: 나의 기업 비교 현황 조회
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           default: investment_desc
 *     responses:
 *       '200':
 *         description: 나의 기업 비교 데이터 목록
 */
router.get("/mycorpinfo", asyncHandler(getMyCompareController));

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
 *         description: 삭제할 비교 기업 ID
 *     responses:
 *       '200':
 *         description: 기업 비교 데이터 삭제 처리됨
 */
router.delete("/corpinfo/:id", asyncHandler(deleteCompareCorpController));

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
 *         description: 삭제할 나의 기업 ID
 *     responses:
 *       '200':
 *         description: 나의 기업 비교 데이터 삭제 처리됨
 */
router.delete("/mycorpinfo/:id", asyncHandler(deleteMyCompareCorpController));

/**
 * @openapi
 * /compare/corpinfo/{id}:
 *   delete:
 *     summary: 비교 기업 선택 해제(soft delete)
 *     description: 주어진 corpId에 대해 compare_corp 레코드를 isDelete=true로 업데이트합니다.
 *     tags: [Compare]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID (corpId)
 *     responses:
 *       200:
 *         description: 업데이트 결과(영향받은 행 수 등)
 *       404:
 *         description: 대상 없음
 *       500:
 *         description: 서버 오류
 */
router.delete(
  "/corpinfo/:id",
  asyncHandler(deleteCompareandOptionCountController)
);

/**
 * @openapi
 * /compare/mycorpinfo/{id}:
 *   delete:
 *     summary: 나의 기업 선택 해제(soft delete)
 *     description: 주어진 corpId에 대해 my_compare_corp 레코드를 isDelete=true로 업데이트합니다.
 *     tags: [Compare]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 기업 ID (corpId)
 *     responses:
 *       200:
 *         description: 업데이트 결과(영향받은 행 수 등)
 *       404:
 *         description: 대상 없음
 *       500:
 *         description: 서버 오류
 */
router.delete(
  "/mycorpinfo/:id",
  asyncHandler(deleteMyCompareandOptionCountController)
);

/**
 * @openapi
 * /compare/comparead:
 *   get:
 *     summary: 선택된 기업 ID 목록(나의 기업 + 비교 기업)
 *     description: 현재 사용자에 대해 isDelete=false 인 my_compare_corp 및 compare_corp의 corpId를 평탄화하여 반환합니다.
 *     tags:
 *       - Compare
 *     responses:
 *       '200':
 *         description: corpId 배열
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

router.get("/comparead", asyncHandler(getMyCompareAndMyCompareController));

/**
 * @openapi
 * /compare/comparerank:
 *   get:
 *     summary: 선택된 기업 목록에 전역 투자금 랭킹 부착
 *     description: 선택된 corpId들만 대상으로 기업 정보를 조회하고, 전체 Corp 테이블 기준 투자금 랭킹(investment_rank)을 부착합니다.
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: 페이지 오프셋
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 6
 *         description: 페이지 크기
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - investment_desc
 *             - investment_asc
 *             - sales_desc
 *             - sales_asc
 *             - employee_desc
 *             - employee_asc
 *             - investmentHighest
 *             - investmentLowest
 *             - salesHighest
 *             - salesLowest
 *             - employeeHighest
 *             - employeeLowest
 *           default: investment_desc
 *         description: 정렬 기준 (신/구 포맷 모두 지원)
 *     responses:
 *       '200':
 *         description: 선택된 기업 목록(정렬/페이징) + 전역 투자금 랭킹
 *       '500':
 *         description: 서버 오류
 */
router.get("/comparerank", asyncHandler(getRankingCompareController));

/**
 * @openapi
 * /compare/compareorder:
 *   get:
 *     summary: 비교 대상 기업 목록(정렬만, 랭킹 없음)
 *     description: getOrderCompare 컨트롤러를 통해 정렬 기준에 맞춘 기업 목록을 반환합니다.
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: 페이지 오프셋
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 6
 *         description: 페이지 크기
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [investmentLowest, investmentHighest, salesLowest, salesHighest, employeeLowest, employeeHighest, investment_desc]
 *           default: investment_desc
 *         description: >
 *           정렬 기준. 컨트롤러 기본값은 "investment_desc"이며, 서비스에서 기본 분기(투자액 내림차순)로 처리됩니다.
 *     responses:
 *       '200':
 *         description: 정렬된 비교 대상 기업 배열 (랭킹 없음)
 *       '500':
 *         description: 서버 오류
 */
router.get("/compareorder", asyncHandler(getOrderCompareController));

/**
 * @openapi
 * /compare/comparetotal:
 *   get:
 *     summary: 랭킹 포함 목록과 정렬 목록 동시 조회
 *     description: getTotalCompare 컨트롤러를 통해 랭킹 결과(compareRank)와 정렬 결과(compareOder)를 함께 반환합니다.
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 6
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [investmentLowest, investmentHighest, salesLowest, salesHighest, employeeLowest, employeeHighest, investment_desc]
 *           default: investment_desc
 *     responses:
 *       '200':
 *         description: 랭킹 결과와 정렬 결과를 모두 반환합니다.
 *       '500':
 *         description: 서버 오류
 */
router.get("/comparetotal", asyncHandler(getTotalCompareController));

// 이거 아래 안내리면 오류남 그냥 기업 조회 + 기업 선택 등
/**
 * @openapi
 * /compare:
 *   get:
 *     summary: 전체 비교 기업 목록 조회
 *     tags:
 *       - Compare
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           default: investment_desc
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 전체 기업 목록 반환
 */
router.get("/", asyncHandler(listCorpinCompareController));

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
 *         description: 조회할 기업 ID
 *     responses:
 *       '200':
 *         description: 단일 기업 반환
 *       '404':
 *         description: 해당 기업을 찾을 수 없음
 */
router.get("/:id", asyncHandler(getCorpinCompareController));
