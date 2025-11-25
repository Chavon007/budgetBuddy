import mongoose from "mongoose";
import Expenses from "../model/expenses.js";
import income from "../model/income.js";
import { monthRange } from "../ultiz/monthRange.js";

export const monthlySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const months = parseInt(req.query.months) || 6;
    const now = new Date();

    //  Build month list
    const monthList = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthList.push({
        month: d.toLocaleString("default", { month: "short" }),
        year: d.getFullYear(),
      });
    }

    //  Aggregate income for all months at once
    const incomeAgg = await income.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
    ]);

    //  Aggregate expenses for all months at once
    const expensesAgg = await Expenses.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amountSpend" },
        },
      },
    ]);

    //  Map results to each month
    const result = monthList.map(({ month, year }) => {
      const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1; // 1–12 for MongoDB
      const incomeItem = incomeAgg.find(
        (i) => i._id.year === year && i._id.month === monthNum
      );
      const expenseItem = expensesAgg.find(
        (e) => e._id.year === year && e._id.month === monthNum
      );

      return {
        month,
        year,
        income: incomeItem ? incomeItem.total : 0,
        expenses: expenseItem ? expenseItem.total : 0,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const monthtlypieChart = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();
    const month = req.query.month
      ? parseInt(req.query.month)
      : now.getMonth() + 1;
    const year = req.query.year ? parseInt(req.query.year) : now.getFullYear();

    const { start, end } = monthRange(year, month);

    const agg = await Expenses.aggregate([
      { $match: { userId: userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: "$product", total: { $sum: "$amountSpend" } } },
      { $project: { product: "$_id", total: 1, _id: 0 } },
    ]);

    res.status(200).json({ success: true, data: agg || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
