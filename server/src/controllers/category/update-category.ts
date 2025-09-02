import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler } from "express";
export const updateCategory: RequestHandler = async (req, res) => {
  const { id, updates } = req.body;
  const updated = await FoodCategoryModel.findByIdAndUpdate(id, updates);
  if (updated == null) {
    res
      .sendStatus(404)
      .json({ message: "Couldn't find the item specified by given id!" });
    return;
  }
  res.json({ message: "Updated successfully!" });
};
