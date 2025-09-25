import { FoodCategoryModel } from "../../models/food-category.model";
import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await FoodCategoryModel.findByIdAndDelete(id);
  const foodsToBeDeleted = await FoodModel.find({ category: id });
  for (let i = 0; i < foodsToBeDeleted.length; i++) {
    await FoodModel.findByIdAndDelete(foodsToBeDeleted[i]._id);
  }
  if (deletedCategory == null) {
    res.sendStatus(404);
    return;
  }
  res.json({ message: "Deleted successfully!" });
};
