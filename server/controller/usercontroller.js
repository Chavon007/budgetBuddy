import usermodel from "../model/usermodel.js";
import passwordUltiz from "../ultiz/hashedPassword.js";

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

export default createAccount;
