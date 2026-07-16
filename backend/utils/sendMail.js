import nodemailer from 'nodemailer'

export const sendMail = async (to, subject, message) => {
    console.log('Sending email to: ', to);
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html: message
        });


    }catch(e){
        console.error('Error creating transporter: ', e);
    }
}