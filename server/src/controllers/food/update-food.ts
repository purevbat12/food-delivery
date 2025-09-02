import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const updateFood: RequestHandler = async (req, res) => {
  const { id, updates } = req.body;
  const updated = await FoodModel.findByIdAndUpdate(id, updates);
  if (updated == null) {
    res.json({ message: "Could not find the food with the id " + id + "!" });
    return;
  }
  res.json({ message: "Successfully updated!" });
};
