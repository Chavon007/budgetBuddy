import bcrypt from "bcryptjs";

const hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (enterPassword, confirmPassword) => {
  return await bcrypt.compare(enterPassword, confirmPassword);
};

export default { comparePassword, hashpassword };
