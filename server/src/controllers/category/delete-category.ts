import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler } from "express";
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.body;
  const totalCategories = await FoodCategoryModel.find();
  let categoryExists = false;
  for (let i: number = 0; i < totalCategories.length; i++) {
    if (totalCategories[i].id == id) {
      categoryExists = !categoryExists;
      break;
    }
  }
  if (categoryExists) {
    res
      .sendStatus(404)
      .json({ message: `Category with the id ${id} was not found!` });
  }
  await FoodCategoryModel.findByIdAndDelete(id);
  res.json({ message: "Deleted successfully!" });
};
