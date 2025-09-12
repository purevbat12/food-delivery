import { FoodOrderModel } from "../../models/food-order.model";
import { RequestHandler } from "express";
export const updateOrder: RequestHandler = async (req, res) => {
  const { id, updates } = req.body;
  const updated = await FoodOrderModel.findByIdAndUpdate(id, updates);
  if (!updates) {
    res.json({ message: "Order not found!", status: 404 });
  }
  res.json({ message: "Successfully updated order!" });
};
