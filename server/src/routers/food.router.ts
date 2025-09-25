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
import { authorization, authenticateUser } from "../middleware";
export const foodRouter = Router()
  .get("/get/:id", authorization, getFood)
  .get("/get-all", getFoods)
  .get("/get-all-foods-by-all-categories", getAllFoodsByAllCategories)
  .get(
    "/get-all-foods-by-all-categories-object",
    getAllFoodsByAllCategoriesObject
  )
  .post("/create", authorization, authenticateUser, createFood)
  .put("/update", authorization, authenticateUser, updateFood)
  .delete("/delete/:id", authorization, authenticateUser, deleteFood)
  .get("/get-foods-by-category", getFoodsByCategory);
