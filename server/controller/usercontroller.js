import usermodel from "../model/usermodel.js";
import passwordUltiz from "../ultiz/hashedPassword.js";
import generateToken from "../ultiz/token.js";
import sendmail from "../ultiz/emailsender.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

//Create account
const createAccount = async (req, res) => {
  try {
    const { email, firstName, lastName, password, phone } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hash = await passwordUltiz.hashpassword(password);

    const registerUser = await usermodel.create({
      email,
      firstName,
      lastName,
      password: hash,
      phone,
    });
    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: registerUser._id,
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        email: registerUser.email,
        phone: registerUser.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create account", err });
  }
};

//Login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login route hit", req.body);
    const login = await usermodel.findOne({ email });
    if (!login) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await passwordUltiz.comparePassword(
      password,
      login.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(login);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ success: true, message: "Login successful", data: login, token });
  } catch (err) {
    res.status(401).json({ message: "Can't Login" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await usermodel.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "No User found" });
    }
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone, currency, email } = req.body;
    const updateUserProfile = await usermodel
      .findByIdAndUpdate(
        userId,
        { firstName, lastName, phone, currency, email },
        { new: true, runValidators: true }
      )
      .select("-password");

    if (!updateUserProfile) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateUserProfile,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (err) {}
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please email field can't be empty" });
    }
    const userEmail = await usermodel.findOne({ email });
    if (!userEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    userEmail.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    userEmail.resetExpires = Date.now() + 15 * 60 * 1000;

    await userEmail.save();

    sendmail(email, resetToken).catch((err) => {
      console.error("Email sending failed");
    });
    res
      .status(200)
      .json({ success: true, message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please input new password" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await usermodel.findOne({
      resetToken: hashedToken,
      resetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpwd = bcrypt.hashSync(password, salt);

    user.password = hashedpwd;
    user.resetExpires = undefined;
    user.resetToken = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default {
  forgetPassword,
  createAccount,
  loginUser,
  getUser,
  updateProfile,
  logout,
  resetPassword,
};
