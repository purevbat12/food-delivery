import { FoodOrderModel } from "../../models/food-order.model";
import { RequestHandler } from "express";
export const createOrder: RequestHandler = async (req, res) => {
  const { user, totalPrice, foodOrderItems, status } = req.body;
  if (!user || !totalPrice || !foodOrderItems || !status) {
    res.json({ message: `Missing information!` });
  }
  await FoodOrderModel.create({ user, totalPrice, foodOrderItems, status });
  res.json({ message: "Successfully created order!" });
};
