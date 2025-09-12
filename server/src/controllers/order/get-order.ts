import { FoodOrderModel } from "../../models/food-order.model";
import { RequestHandler } from "express";
export const getOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const order = await FoodOrderModel.find({ _id: id });
  if (!order) {
    res.json({ message: "Order not found!", status: 404 });
  }
  res.json({ order });
};
