import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_API);

export const sendMail = async (to, subject, message) => {
  try {
    console.log("Sending email to:", to);

    const data = await resend.emails.send({
      from: "matul8081@gmail.com",
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