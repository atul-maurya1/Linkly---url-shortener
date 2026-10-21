import { Resend } from 'resend';
import dotenv from "dotenv";
dotenv.config()


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (subject, otp , to) => {
    try{
       const data = await resend.emails.send({
        from: "Linkly<onboarding@resend.dev>",
        to,
        subject,
        html: otpEmailTemplate(otp),
     });
     console.log("mail send") 
    }catch(err){
        console.error("error while sending mail.. ", err)
    }
}




const otpEmailTemplate = (otp, name = "User") => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f7fb;
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
    ">

        <table width="100%" cellpadding="0" cellspacing="0"
            style="background-color: #f4f7fb; padding: 40px 12px;">
            <tr>
                <td align="center">

                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="
                            max-width: 520px;
                            background-color: #ffffff;
                            border-radius: 12px;
                            overflow: hidden;
                            border: 1px solid #e5e7eb;
                        ">

                        <!-- Header -->
                        <tr>
                            <td align="center"
                                style="padding: 32px 24px 20px;">

                                <h1 style="
                                    margin: 0;
                                    font-size: 28px;
                                    font-weight: 700;
                                    color: #4f46e5;
                                ">
                                    Linkly
                                </h1>

                                <p style="
                                    margin: 8px 0 0;
                                    font-size: 13px;
                                    color: #6b7280;
                                ">
                                    Short your Url
                                </p>

                            </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 20px 32px 32px;">

                                <h2 style="
                                    margin: 0 0 16px;
                                    font-size: 23px;
                                    color: #111827;
                                    text-align: center;
                                ">
                                    Verify Your Email
                                </h2>

                                <p style="
                                    margin: 0 0 16px;
                                    font-size: 15px;
                                    line-height: 1.7;
                                    color: #4b5563;
                                ">
                                    Hi ${name},
                                </p>

                                <p style="
                                    margin: 0 0 24px;
                                    font-size: 15px;
                                    line-height: 1.7;
                                    color: #4b5563;
                                ">
                                    Thanks for signing up for Linkly!
                                    Please use the verification code below
                                    to verify your email address and complete
                                    your registration.
                                </p>

                                <!-- OTP Box -->
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center"
                                            style="
                                                background-color: #f5f3ff;
                                                border: 1px solid #ddd6fe;
                                                border-radius: 10px;
                                                padding: 24px 12px;
                                            ">

                                            <p style="
                                                margin: 0 0 12px;
                                                font-size: 12px;
                                                font-weight: 700;
                                                letter-spacing: 2px;
                                                color: #6b7280;
                                            ">
                                                YOUR VERIFICATION CODE
                                            </p>

                                            <p style="
                                                margin: 0;
                                                font-size: 34px;
                                                font-weight: 700;
                                                letter-spacing: 10px;
                                                color: #4f46e5;
                                            ">
                                                ${otp}
                                            </p>

                                        </td>
                                    </tr>
                                </table>

                                <p style="
                                    margin: 24px 0 12px;
                                    font-size: 14px;
                                    line-height: 1.7;
                                    color: #4b5563;
                                    text-align: center;
                                ">
                                    This code will expire in
                                    <strong>2 minutes</strong>.
                                </p>

                                <p style="
                                    margin: 0;
                                    font-size: 13px;
                                    line-height: 1.7;
                                    color: #6b7280;
                                ">
                                    If you didn't request this verification
                                    code, you can safely ignore this email.
                                    Never share your OTP with anyone.
                                </p>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center"
                                style="
                                    background-color: #f9fafb;
                                    border-top: 1px solid #e5e7eb;
                                    padding: 22px 24px;
                                ">

                                <p style="
                                    margin: 0 0 8px;
                                    font-size: 12px;
                                    color: #9ca3af;
                                ">
                                    © ${new Date().getFullYear()} Linkly.
                                    All rights reserved.
                                </p>

                                <p style="
                                    margin: 0;
                                    font-size: 12px;
                                    color: #9ca3af;
                                ">
                                    This is an automated email.
                                    Please do not reply.
                                </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
}
