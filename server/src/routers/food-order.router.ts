import { Router } from "express";
import {
  getOrders,
  getOrder,
  deleteOrder,
  createOrder,
  updateOrder,
} from "../controllers";
export const foodOrderRouter = Router()
  .get("/get-all", getOrders)
  .get("/get/:id", getOrder)
  .delete("/delete/:id", deleteOrder)
  .post("/create", createOrder)
  .put("/update", updateOrder);
