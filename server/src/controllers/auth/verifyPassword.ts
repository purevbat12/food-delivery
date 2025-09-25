import { UserModel } from "../../models";
import { RequestHandler } from "express";
import { decryptHash } from "../../utils";
export const verifyPassword: RequestHandler = async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = await UserModel.findOne({email: email});
    if (!user){
        res.status(400).send({ message: "User does not exist." });
        return;
    }
    const isValid = decryptHash(password, user.password);
    res.json({valid: isValid});
}