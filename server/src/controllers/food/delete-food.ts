import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const deleteFood: RequestHandler = async (req, res) => {
  const deleted = await FoodModel.findByIdAndDelete(req.body.id);
  if (deleted == null) {
    res.json({
      message: "Could not find the food with the id " + req.body.id + "!",
    });
    return;
  }
  res.json({ message: "Successfully deleted!" });
};
