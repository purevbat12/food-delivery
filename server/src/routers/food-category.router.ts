import { Router } from "express";
import {
  createFoodCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../controllers";
import { authorization, authenticateUser } from "../middleware";
export const foodCategoryRouter = Router()
  .post("/create", authorization, authenticateUser, createFoodCategory)
  .get("/get-all", getAllCategories)
  .delete("/delete/:id", authorization, authenticateUser, deleteCategory)
  .put("/update", authorization, authenticateUser, updateCategory);
//   .get("/");
