import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler } from "express";

export const getAllCategories: RequestHandler = async (req, res) => {
  const allCategories = await FoodCategoryModel.find();
  res.json({ allCategories });
};
