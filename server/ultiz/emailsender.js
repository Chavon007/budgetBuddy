import dotenv from "dotenv";

import { Resend } from "resend";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendmail = async (email, token) => {
  try {
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: `budgetbuddy <onboarding@resend.dev>`,
      to: email,
      subject: "Paswword reset link",
      html: `<h2>You requested for a password reset</h2>
    <p>Click on the link below to reset your password and if the request was not made by you, you can ignore the email </p>
    <a href="${resetURL}">Reset password</a>
    <p>This link expires in 15 minutes</P>`,
    });
    if (error) {
      console.error("Resend error", error);
    }
    console.log("Email sent successfully", data.id);
    return data;
  } catch (err) {
    console.error("Email failed to send", err.message);
    throw err;
  }
};

export default sendmail;
