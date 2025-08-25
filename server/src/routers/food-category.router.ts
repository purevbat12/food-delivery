import { Router } from "express";
import {
  createFoodCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../controllers";
export const foodCategoryRouter = Router()
  .post("/", createFoodCategory)
  .get("/", getAllCategories)
  .delete("/", deleteCategory)
  .put("/", updateCategory);
//   .get("/");
