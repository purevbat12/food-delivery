import { FoodModel } from "../../models/food.model";
import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler } from "express";
import { foodType } from "../../types";
export const getAllFoodsByAllCategoriesObject: RequestHandler = async (
  req,
  res
) => {
  //let allFoodsByAllCategoriesObject: { [key: string]: foodType[] } = {};
  let allFoodsByAllCategoriesObject: Record<string, foodType[]> = {};
  const allCategories = await FoodCategoryModel.find();
  for (let i = 0; i < allCategories.length; i++) {
    const foodsOfCategory = await FoodModel.find({
      category: allCategories[i]._id,
    });
    allFoodsByAllCategoriesObject[allCategories[i].categoryName as string] =
      foodsOfCategory.map((food) => ({
        ...food.toObject(),
        _id: food._id.toString(),
        category: food.category.toString(),
      }));
  }
  res.json(allFoodsByAllCategoriesObject);
};
