import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFood,
  getFoods,
  updateFood,
} from "../controllers/food";

export const foodRouter = Router()
  .get("/get", getFood)
  .get("/get-all", getFoods)
  .post("/create", createFood)
  .put("/update", updateFood)
  .delete("/delete", deleteFood);
