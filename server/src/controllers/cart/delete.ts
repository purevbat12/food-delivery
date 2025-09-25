import { FoodCartModel } from "../../models";
import { RequestHandler } from "express";
export const deleteCart: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const deleted = await FoodCartModel.findByIdAndDelete(id);
    if(!deleted){
        res.json({message: "Could not delete cart!"});
        return;
    }
    res.json({message: "Successfully deleted cart!"});
}