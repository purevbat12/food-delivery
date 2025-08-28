import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const getFoodsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;
  const foodsByCategory = await FoodModel.find({ category: categoryId });
  if (foodsByCategory == null || foodsByCategory.length == 0) {
    res.json({ message: "No food with " + categoryId + " was found!" });
  }
  res.json({ foodsByCategory });
};
