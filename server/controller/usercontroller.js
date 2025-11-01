import usermodel from "../model/usermodel.js";
import passwordUltiz from "../ultiz/hashedPassword.js";
import generateToken from "../ultiz/token.js";

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
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "none",
    });

    res.status(200).json({ success:true,  message: "Login successful", data: login, token });
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
    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        data: updateUserProfile,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export default { createAccount, loginUser, getUser, updateProfile };
