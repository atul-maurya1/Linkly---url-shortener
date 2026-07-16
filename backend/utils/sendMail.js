import {Resend} from 'resend'

export const sendMail = async (to, subject, message) => {
    console.log('Sending email to: ', to);
   const resend = new Resend(process.env.EMAIL_API);

    resend.emails.send({
    from: process.env.EMAIL,
    to,
    subject,
    html: message
    });

}