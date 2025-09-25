import { RequestHandler } from "express";
import { UserModel } from "../../models";
export const updateUser: RequestHandler = async (req, res) => {
    const { id, updates } = req.body;
    const updated = await UserModel.findByIdAndUpdate(id, updates);
    if(!updated){
        res.json({message: "Could not find or update user information!"});
        return;
    }
    res.json({message: "Successfully updated!"});
}