import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amountSpend: {
    type: Number,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("expenses", expensesSchema);
