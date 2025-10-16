import express from "express";
import incomeController from "../controller/income.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/create-income", authMiddleware, incomeController.createIncome);
router.get("/get-income",authMiddleware, incomeController.getIncome);
router.delete("/delete-income/:id", authMiddleware, incomeController.deletedIncome);

export default router;
