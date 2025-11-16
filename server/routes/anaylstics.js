import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import { monthlySummary, monthtlypieChart } from "../controller/anaylstics.js";

const router = express.Router();

router.get("/monthly-summary", authMiddleware, monthlySummary);
router.get("/monthly-pie-chart", authMiddleware, monthtlypieChart);

export default router;
