import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.APP_PASSKEY,
  },
});

const sendmail = async (email, token) => {
  const resetURL = `https://budget-buddy-one-tau.vercel.app/${token}`;

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
