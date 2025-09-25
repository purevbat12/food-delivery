import { FoodCartModel } from "../../models";
import { RequestHandler } from "express";
export const createCart: RequestHandler = async (req, res) => {
    const { userId } = req.body;
    const created = await FoodCartModel.create({
        user: userId,
        cartItems: []
    });
    if(!created){
        res.json({message: "Could not create cart!"});
        return;
    }
    res.json({message: "Successfully created cart!"});
}