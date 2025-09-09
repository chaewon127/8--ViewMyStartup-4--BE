import express from "express";
import investmentController from "../controllers/investmentController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/investments", asyncHandler(investmentController.getInvestments));

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
