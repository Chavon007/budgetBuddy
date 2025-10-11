import express from "express";
import createAccount from "../controller/usercontroller.js";

const router = express.Router();

router.post("/signup", createAccount);

export default router;
