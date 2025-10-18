import Goal from "../model/goals.js";

// create goal

const createGoal = async (req, res) => {
  try {
    const { theGoal } = req.body;
    const userId = req.user.id;

    if (!theGoal) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill the required field" });
    }
    const newGoal = await Goal.create({
      userId,
      theGoal,
    });
    res.status(200).json({
      success: true,
      message: "Goal created successfully",
      data: newGoal,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get all  goal created

const getGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const getGoal = await Goal.find({ userId });

    if (getGoal.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No goal found", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Goals fetched successfully",
      data: getGoal,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Achieved Goals

const getAchievedGoals = async (req, res) => {
  try {
    const userId = req.user.id;

    const getAchievedgoal = await Goal.find({ userId, completed: true });

    if (getAchievedgoal.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No Achieved goals yet", data: [] });
    }
    res.status(200).json({
      success: true,
      message: "Fetched all achieved Goals",
      data: getAchieved,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//update a achieved goal

const updateAchievedGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { goalId } = req.params;

    const update = await Goal.findOne({ _id: goalId, userId });

    if (!update) {
      return res.status(404).json({ success: false, message: "No Goal found" });
    }

    update.completed = true;
    update.completedAt = new Date();

    await update.save();
    res
      .status(200)
      .json({ success: true, message: "Goal completed", data: update });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//delete goal

const deleteGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { goalId } = req.params;

    const deleteGoal = await Goal.findOneAndDelete({ _id: goalId, userId });
    if (!deleteGoal) {
      return res.status(404).json({ success: false, message: "No goal found" });
    }
    res
      .status(201)
      .json({ success: true, message: "Goal deleted", data: deleteGoal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default{deleteGoal, createGoal, updateAchievedGoals, getGoals, getAchievedGoals}
