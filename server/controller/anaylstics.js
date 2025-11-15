import mongoose from "mongoose";
import expenses from "../model/expenses";
import income from "../model/income";
import { monthRange } from "../ultiz/monthRange";

export const monthlySummary = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    const months = req.query.months;
    const now = new Date();
    const result = [];

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const { start, end } = monthRange(d.getFullYear(), d.getMonth());

      const [incomesumAgg] = await income.aggregate([
        { $match: { userId: userId, date: { $gte: start, $lt: end } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      const [expensessumAgg] = await expenses.aggregate([
        { $match: { userId: userId, date: { $gte: start, $lt: end } } },
        { $group: { _id: null, total: { $sum: "$amountSpend" } } },
      ]);
      result.push({
        month: d.toLocaleString("default", { month: "short" }),
        year: d.getFullYear(),
        income: incomesumAgg ? incomesumAgg.total : 0,
        expenses: expensessumAgg ? expensessumAgg.total : 0,
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const monthtlypieChart = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    const { start, end } = monthRange(year, month);

    const agg = await expenses.aggregate([
      { $match: { userid: userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: "$product", total: { $sum: "$amountSpend" } } },
      { $project: { product: "$_id", total: 1, _id: 0 } },
    ]);

    res.start(200).json({ success: true, data: agg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
