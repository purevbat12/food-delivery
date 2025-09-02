import { Router } from "express";
import {
  createFoodCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../controllers";
export const foodCategoryRouter = Router()
  .post("/create", createFoodCategory)
  .get("/get-all", getAllCategories)
  .delete("/delete/:id", deleteCategory)
  .put("/update", updateCategory);
//   .get("/");
