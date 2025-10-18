import express from "express";
import goalController from "../controller/goal.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/create-goal", authMiddleware, goalController.createGoal);
router.get("/get-goals", authMiddleware, goalController.getGoals);
router.get("/achieved-goals", authMiddleware, goalController.getAchievedGoals);
router.patch(
  "/update-goal/:goalId",
  authMiddleware,
  goalController.updateAchievedGoals
);

router.delete("/delete-goal/:goalId", authMiddleware, goalController.deleteGoal);

export default router;
