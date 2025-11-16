import express from "express";
import expensesController from "../controller/expenses.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router = express.Router();

router.post(
  "/create-expenses",
  authMiddleware,
  expensesController.createExpenses
);
router.get("/get-expenses", authMiddleware, expensesController.getExpenses);
router.delete(
  "/delete-expenses",
  authMiddleware,
  expensesController.deleteExpenses
);
router.put(
  "/update-expenses",
  authMiddleware,
  expensesController.updateExpenses
);
router.get("/totalexpenses", authMiddleware, expensesController.totalExpenses);
router.get(
  "/monthly-expenses",
  authMiddleware,
  expensesController.monthlyExpenses
);
export default router;
