import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";
export const getFood: RequestHandler = async (req, res) => {
  const food = await FoodModel.findOne({ foodName: req.body.foodName });
  if (food == null) {
    res.sendStatus(404).json({
      message:
        "Could not find the food with the name " + req.body.foodName + "!",
    });
  }
  res.json(food);
};
