import { FoodOrderModel } from "../../models/food-order.model";
import { RequestHandler } from "express";
export const deleteOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deleted = await FoodOrderModel.findByIdAndDelete(id);
  if (!deleted) {
    res.json({ message: "Order not found!", status: 404 });
  }
  res.json({ message: "Successfully deleted!" });
};
