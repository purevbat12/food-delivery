import { Router } from "express";
import {
  getOrders,
  getOrder,
  deleteOrder,
  createOrder,
  updateOrder,
  getOrdersOfUser
} from "../controllers";
import { authorization } from "../middleware";
export const foodOrderRouter = Router()
  .get("/get-all", getOrders)
  .get("/get/:id", authorization, getOrder)
  .delete("/delete/:id", authorization, deleteOrder)
  .post("/create", authorization, createOrder)
  .put("/update", authorization, updateOrder)
  .get("/get-orders-of-user/:userId", getOrdersOfUser);