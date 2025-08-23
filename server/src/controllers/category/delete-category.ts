import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler } from "express";
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.body;
  const deletedCategory = await FoodCategoryModel.findByIdAndDelete(id);
  if (deletedCategory == null) {
    res.sendStatus(404).json({ message: "Could not find specifiec item!" });
  }
  res.json({ message: "Deleted successfully!" });
};
