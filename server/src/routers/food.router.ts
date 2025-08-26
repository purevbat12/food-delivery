import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFood,
  getAllFoodsByAllCategories,
  updateFood,
  getFoodsByCategory,
} from "../controllers/food";

export const foodRouter = Router()
  .get("/get", getFood)
  .get("/get-all-foods-by-all-categories", getAllFoodsByAllCategories)
  .post("/create", createFood)
  .put("/update", updateFood)
  .delete("/delete", deleteFood)
  .get("/get-foods-by-category", getFoodsByCategory);
