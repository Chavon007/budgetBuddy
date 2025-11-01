import mongoose from "mongoose";
import Income from "../model/income.js";
import Expenses from "../model/expenses.js"; // for balance calc

// CREATE INCOME
const createIncome = async (req, res) => {
  try {
    const { amount, date } = req.body;
    const userId = req.user.id;

    if (!amount || !date) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newIncome = await Income.create({ amount, date, userId });
    res.status(200).json({
      success: true,
      message: "Income created successfully",
      data: newIncome,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL INCOMES
const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Income.find({ userId });
    if (data.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No income record", data: [] });
    }
    res.status(200).json({ success: true, message: "Income fetched", data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Can't get income now",
      error: err.message,
    });
  }
};

// DELETE INCOME
const deletedIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deleteIncome = await Income.findOneAndDelete({ _id: id, userId });
    if (!deleteIncome) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }
    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
      data: deleteIncome,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete income",
      error: err.message,
    });
  }
};

// GET TOTAL INCOME ✅ FIXED
const totalIncome = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED

    const totalIncomes = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, allIncomes: { $sum: "$amount" } } },
    ]);

    const totalOfAllIncomes = totalIncomes[0]?.allIncomes || 0;

    res.status(200).json({
      success: true,
      message: "Total income fetched",
      data: totalOfAllIncomes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TOTAL BALANCE ✅ FIXED
const totalBalance = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED

    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, allIncomes: { $sum: "$amount" } } },
    ]);
    const mainIncome = totalIncome[0]?.allIncomes || 0;

    const totalExpenses = await Expenses.aggregate([
      { $match: { userId } },
      { $group: { _id: null, allExpensesTotal: { $sum: "$amountSpend" } } },
    ]);
    const allTotalExpenses = totalExpenses[0]?.allExpensesTotal || 0;

    const totalBalance = mainIncome - allTotalExpenses;

    res.status(200).json({
      success: true,
      message: "Total balance fetched",
      data: totalBalance,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  createIncome,
  getIncome,
  deletedIncome,
  totalIncome,
  totalBalance,
};
