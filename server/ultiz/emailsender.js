import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
console.log("ACCOUNT:", process.env.GMAIL_ACCOUNT);
console.log("PASS:", process.env.APP_PASSKEY);
const transport = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.APP_PASSKEY,
  },
});

const sendmail = async (email, token) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await transport.sendMail({
    from: `budgetbuddy <${process.env.GMAIL_ACCOUNT}>`,
    to: email,
    subject: "Paswword reset link",
    html: `<h2>You requested for a password reset</h2>
    <p>Click on the link below to reset your password and if the request was not made by you, you can ignore the email </p>
    <a href="${resetURL}">Reset password</a>
    <p>This link expires in 15 minutes</P>`,
  });
};

export default sendmail;
