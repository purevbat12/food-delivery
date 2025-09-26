import { UserModel } from "../../models";
import { Request, Response } from "express";
import { decryptHash, generateNewToken } from "../../utils";
export const signInController = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password) {
            res.status(400).send({ message: "Email or password is missing." });
            return;
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ message: "User does not exist." });
            return;
        }
        const isPasswordValid = decryptHash(password, user.password);
        if (!isPasswordValid){
            res.status(400).send({ message: "Invalid password." });
            return;
        }
        const token = generateNewToken({ userId: user._id });
        res.status(200).send({ message: "Successfully logged in.", token: token, user: user });
    } 
    catch (error){
        console.error("Error in signInController:", error);
        res.status(500).send({ message: "Internal server error.", error: error instanceof Error ? error.message : "Unknown error" });
    }
};