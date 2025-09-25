import { FoodCartModel } from "../../models";
import { RequestHandler } from "express";
export const getAll: RequestHandler = async (req, res) => {
    const allCarts = await FoodCartModel.find();
    res.json(allCarts);
}