import express from "express";
import dbConfig from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import incomeRouter from "./routes/income.js";
import expensesRouter from "./routes/expenses.js";
import goalRouter from "./routes/goal.js";
dotenv.config();
dbConfig();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Budgetbuddy backend is running");
});
app.use("/api/users", userRouter);
app.use("/api/", incomeRouter);
app.use("/api/", expensesRouter);
app.use("/api", goalRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
