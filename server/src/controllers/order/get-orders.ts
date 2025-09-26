import { FoodOrderModel } from "../../models/food-order.model";
import { RequestHandler } from "express";
export const getOrders: RequestHandler = async (req, res) => {
  const orders = await FoodOrderModel.find();
  res.json({ orders: orders });
};
