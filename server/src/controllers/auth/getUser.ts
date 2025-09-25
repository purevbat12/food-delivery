import { UserModel } from "../../models";
import { RequestHandler } from "express";
export const getUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if(user == null){
        res.json({message: "User not found!"});
    }
    res.json(user);
}