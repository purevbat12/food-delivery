import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const getFoodsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.body;
  const foodsByCategory = await FoodModel.find({ category: categoryId });
  if (foodsByCategory == null) {
    res.json({ message: "No food with " + categoryId + " was found!" });
  }
  res.json({ foodsByCategory });
};
