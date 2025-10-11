import express from "express";
import dbConfig from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();

dbConfig();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Budgetbuddy backend is running");
});
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
