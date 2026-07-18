import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


export const sendMail = async (email, otp) => {

   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
        name: "Linkly",
        email: process.env.SENDER_EMAIL,
    };

    sendSmtpEmail.to = [
        {
            email,
        },
    ];

    sendSmtpEmail.subject = "Your OTP Verification Code";

    sendSmtpEmail.htmlContent = `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    
};