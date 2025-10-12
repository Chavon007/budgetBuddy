import express from "express";
// import createAccount from "../controller/usercontroller.js";
import userController from "../controller/usercontroller.js";

const router = express.Router();

router.post("/signup", userController.createAccount);
router.post("/login", userController.loginUser);
export default router;
