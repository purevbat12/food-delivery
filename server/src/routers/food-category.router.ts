import { Router } from "express";
import {
  createFoodCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers";
export const foodCategoryRouter = Router()
  .post("/", createFoodCategory)
  .get("/", getAllCategories)
  .delete("/", deleteCategory);
//   .get("/");
