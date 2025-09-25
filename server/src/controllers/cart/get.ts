import { FoodCartModel } from "../../models";
import { RequestHandler } from "express";
export const getCart: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    const cart = await FoodCartModel.find({user: userId});
    if(!cart){
        res.json({message: "Cart not found associated with user!"});
    }
    res.json(cart[0] ? cart[0] : null);
}