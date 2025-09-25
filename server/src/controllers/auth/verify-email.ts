import { RequestHandler } from "express"
import { sendUserVerificationLink } from "../../utils";
export const verifyEmail: RequestHandler = (req, res) => {
    const { email, token } = req.body;
    sendUserVerificationLink(
        `${req.protocol}://${req.get("host")}/auth/verify-user?token=${token}`,
        email
    );
    res.json({message: "Sent email to " + email});
}