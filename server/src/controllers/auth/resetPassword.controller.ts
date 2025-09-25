import { UserModel } from "../../models";
import { Request, Response } from "express";
import { encryptHash } from "../../utils";
export const resetPasswordController = async (req: Request, res: Response) => {
    try{
        const { newPassword, email } = req.body as { newPassword: string, email: string };
        if (!newPassword) {
            res.status(400).send({ message: "New password is missing." });
            return;
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ message: "User does not exist." });
            return;
        }
        user.password = encryptHash(newPassword);
        await user.save();
        res.status(200).send({ message: "Password reset successfully." });
    }
    catch(err){
        console.error("Error in resetPasswordController:", err);
        res.status(500).send({ message: "Internal server error.", error: err instanceof Error ? err.message : "Unknown error" });
    }
}