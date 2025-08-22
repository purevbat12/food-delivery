import { FoodCategoryModel } from "../../models/food-category.model";
import { Request, RequestHandler, Response } from "express";

export const getAllCategories: RequestHandler = async (req, res) => {
  const allCategories = await FoodCategoryModel.find();
  res.json({ allCategories });
};
