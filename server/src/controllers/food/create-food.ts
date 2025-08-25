import { FoodModel } from "../../models/food.model";
import { RequestHandler } from "express";

export const createFood: RequestHandler = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;
  const added = await FoodModel.create({
    foodName,
    price,
    image,
    ingredients,
    category,
  });
  res.json({ message: "Successfully created!" });
};
