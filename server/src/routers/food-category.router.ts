import { Router } from "express";
import { createFoodCategory, getAllCategories } from "../controllers";
export const foodCategoryRouter = Router()
  .post("/", createFoodCategory)
  .get("/", getAllCategories);
//   .get("/");
