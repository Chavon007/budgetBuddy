import mongoose, { Schema } from "mongoose";

const incomeShema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("income", incomeShema);
