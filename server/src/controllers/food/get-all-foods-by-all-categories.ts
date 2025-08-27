import { FoodModel } from "../../models/food.model";
import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler } from "express";
export const getAllFoodsByAllCategories: RequestHandler = async (req, res) => {
  let allFoodsByAllCategories = [];
  const allCategories = await FoodCategoryModel.find();
  console.log(allCategories);
  for (let i = 0; i < allCategories.length; i++) {
    const foodsOfCategory = await FoodModel.find({
      category: allCategories[i]._id,
    });
    allFoodsByAllCategories.push(foodsOfCategory);
  }
  res.json(allFoodsByAllCategories);
};
