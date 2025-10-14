import express from "express";
import incomeController from "../controller/income.js";

const router = express.Router();

router.post("/create-income", incomeController.createIncome);
router.get("/get-income", incomeController.getIncome);
router.delete("/delete-income/:id", incomeController.deletedIncome);

export default router;
