import Income from "../model/income.js";

//create expenses
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

const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Income.find({ userId });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No income reacord" });
    }
    res.status(200).json({ success: true, message: "Income fetched", data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't get income now",
      error: err.message,
    });
  }
};

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
      message: "Income delete successfully",
      data: deleteIncome,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete income",
      error: err.message,
    });
  }
};
export default { createIncome, getIncome, deletedIncome };
