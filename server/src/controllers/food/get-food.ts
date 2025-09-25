import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const getFood: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const food = await FoodModel.findById(id);
  if (food == null) {
    res.sendStatus(404);
    return;
  }
  res.json(food);
};
