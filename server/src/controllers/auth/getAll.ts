import { RequestHandler } from "express";
import { UserModel } from "../../models";
export const getAll: RequestHandler = async (req, res) => {
    const allUsers = await UserModel.find();
    res.json(allUsers);
}