import { FoodCategoryModel } from "../../models/food-category.model";
import { RequestHandler, Request, Response } from "express";
export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  const totalCategories = await FoodCategoryModel.find();
  for (let i: number = 0; i < totalCategories.length; i++) {
    if (totalCategories[i].id == id) {
      res
        .sendStatus(404)
        .json({ message: `Category with the id ${id} was not found!` });
    }
  }
  await FoodCategoryModel.findByIdAndDelete(id);
  res.json({ message: "Deleted successfully!" });
};
