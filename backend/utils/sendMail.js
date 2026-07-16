import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_API);

export const sendMail = async (to, subject, message) => {
  try {
    console.log("Sending email to:", to);

    const data = await resend.emails.send({
      from: process.env.EMAIL,
      to,
      subject,
      html: message,
    });

    console.log("Email sent:", data);
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};