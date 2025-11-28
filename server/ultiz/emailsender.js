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

  connectionTimeout: 5000, // 5 seconds to connect
  greetingTimeout: 3000, // 3 seconds for greeting
  socketTimeout: 10000, // 10 seconds for socket timeout
  // Add pool to reuse connections
  pool: true,
  maxConnections: 1,
  maxMessages: 3,
});

transport.verify((error, success) => {
  if (error) {
    console.error(" Email transport verification failed:", error);
  } else {
    console.log(" Email server is ready to send messages");
  }
});

const sendmail = async (email, token) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/?token=${token}`;

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
