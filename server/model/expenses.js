import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
  amountSpend: {
    type: String,
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
  qunatity: {
    type: String,
    required: true,
  },
});

export default mongoose.model("expenses", expensesSchema);
