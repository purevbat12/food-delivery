import { FoodCategoryModel } from "../../models/food-category.model";
import { Request, RequestHandler, Response } from "express";

export const createFoodCategory: RequestHandler = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    res.status(400).json({ message: "Category name is required" });
    return;
  }
  const newCategory = await FoodCategoryModel.create({ categoryName });
  res.status(201).json(newCategory);
};

// mvc architechture => model, router, controller
