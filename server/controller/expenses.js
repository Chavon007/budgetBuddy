import mongoose from "mongoose";
import Expenses from "../model/expenses.js";
import { monthRange } from "../ultiz/monthRange.js";
// create expenses

const createExpenses = async (req, res) => {
  try {
    const { amountSpend, product, date, quantity } = req.body;
    const userId = req.user.id;
    if (!amountSpend || !product || !date || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }
    const newExpenses = await Expenses.create({
      amountSpend,
      product,
      date,
      quantity,
      userId,
    });
    res
      .status(201)
      .json({ success: true, message: "Expenses created", data: newExpenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expenses.find({ userId });

    // Don't return 404 for empty results - return 200 with empty array
    if (expenses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No expenses found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched all Expenses successfully",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedExpenses = await Expenses.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedExpenses) {
      return res
        .status(404)
        .json({ success: false, message: "No expenses found" });
    }
    res.status(200).json({
      success: true,
      message: "Expenses deleted Successfully",
      data: deletedExpenses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const updateExpenses = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { id } = req.params;
    const { amountSpend, product, date, quantity } = req.body;
    if (!amountSpend || !product || !date || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all required fields" });
    }
    const updatedExpenses = await Expenses.findOneAndUpdate(
      { _id: id, userId },
      {
        amountSpend,
        product,
        date,
        quantity,
      },
      { new: true }
    );
    if (!updatedExpenses) {
      return res
        .status(404)
        .json({ success: false, message: "No Expenses to update" });
    }
    res.status(200).json({
      success: true,
      message: "Expenses updated",
      data: updatedExpenses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const totalExpenses = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const total = await Expenses.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalExpense: { $sum: "$amountSpend" } } },
    ]);

    const totalExpense = total[0]?.totalExpense || 0;

    res.status(200).json({
      success: true,
      message: "Total amount spent fetched",
      data: totalExpense,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// monthly expenses

const monthlyExpenses = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();

    const month = parseInt(req.query.month) || now.getMonth() + 1;
    const year = parseInt(req.query.year) || now.getFullYear();

    const { start, end } = monthRange(year, month);

    console.log("month =", month, "year =", year);
    console.log("start =", start, "end =", end);

    const expenses = await Expenses.find({
      userId,
      date: { $gte: start, $lt: end },
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "Monthly expenses fetched",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  createExpenses,
  updateExpenses,
  deleteExpenses,
  getExpenses,
  monthlyExpenses,
  totalExpenses,
};
