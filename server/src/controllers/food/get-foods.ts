import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const getFoods: RequestHandler = async (req, res) => {
  const foods = await FoodModel.find();
  console.log(foods);
  res.json(foods);
};
