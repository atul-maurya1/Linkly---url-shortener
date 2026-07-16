import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (to, subject, message) => {
  try {
    await transporter.verify();
    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: `"Linkly" <${process.env.EMAIL}>`,
      to,
      subject,
      html: message,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Error:", error);
    throw error;
  }
};