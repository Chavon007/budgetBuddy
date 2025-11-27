import express from "express";
// import createAccount from "../controller/usercontroller.js";
import userController from "../controller/usercontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/signup", userController.createAccount);
router.post("/login", userController.loginUser);
router.get("/profile", authMiddleware, userController.getUser);
router.put("/update-profile", authMiddleware, userController.updateProfile);
router.post("/logout", authMiddleware, userController.logout);
router.post("/forget-password", userController.forgetPassword);
router.put("/reset-password", userController.resetPassword);
export default router;
