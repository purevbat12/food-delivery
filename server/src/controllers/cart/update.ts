import { FoodCartModel } from "../../models";
import { RequestHandler } from "express";
export const updateCart: RequestHandler = async (req, res) => {
    const { id, updates } = req.body;
    const updated = await FoodCartModel.updateOne({_id: id}, {$set: updates});
    if(!updated){
        res.json({message: "Could not update cart!"});
        return;
    }
    res.json({message: "Successfully updated cart!"});
}