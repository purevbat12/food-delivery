import { Router } from "express";
import {
  getFoods,
  createFood,
  deleteFood,
  getFood,
  getAllFoodsByAllCategories,
  updateFood,
  getFoodsByCategory,
  getAllFoodsByAllCategoriesObject,
} from "../controllers";

export const foodRouter = Router()
  .get("/get", getFood)
  .get("/get-all", getFoods)
  .get("/get-all-foods-by-all-categories", getAllFoodsByAllCategories)
  .get(
    "/get-all-foods-by-all-categories-object",
    getAllFoodsByAllCategoriesObject
  )
  .post("/create", createFood)
  .put("/update", updateFood)
  .delete("/delete/:id", deleteFood)
  .get("/get-foods-by-category", getFoodsByCategory);
