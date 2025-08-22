import { verifyToken } from "../../utils";
import { Request, Response } from "express";
export const resetPasswordVerifyController = async (req: Request, res: Response) => {
    const token = String(req.query.token);
    if(!token) {
        res.status(400).send({ message: "Token is required." });
        return;
    }
    try{
        const decodedToken = verifyToken(token);
        if (!decodedToken || !decodedToken.userId) {
            res.status(400).send({ message: "Invalid or expired token." });
            return;
        }
        res.redirect(`${process.env.FRONTEND_ENDPOINT}/resetPassword?token=${token}`);
        res.status(200).send({ message: "Token is valid.", userId: decodedToken.userId });
    }
    catch(err){
        console.error("Error in resetPasswordVerifyController:", err);
        res.status(500).send({ message: "Internal server error.", error: err instanceof Error ? err.message : "Unknown error" });
    }
}