import { Router } from "express";
import { getCart, getAll, createCart, deleteCart, updateCart } from "../controllers/cart";
import { authorization } from "../middleware";
export const foodCartRouter = Router()
    .get("/get/:userId", authorization, getCart)
    .get("/get-all", getAll)
    .post("/create", authorization, createCart)
    .put("/update", authorization, updateCart)
    .delete("/delete/:id", deleteCart);