import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";
configDotenv();
const { EMAIL_PASSWORD, EMAIL_USER } = process.env;
const transport = createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    }
});
export const sendUserVerificationLink = async (baseURL: string, email: string) => {
    await transport.sendMail({
        text: "User Verification link",
        to: email,
        subject: "User Verification",
        html: `
            <h1>Verification Link</h1>
            <p>This verification link is valid for 1 hour.</p>
            <a href="${baseURL}">Click here to verify</a>
        `,
        from: EMAIL_USER,
    });
}