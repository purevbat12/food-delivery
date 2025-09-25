import { RequestHandler } from "express";
import { FoodOrderModel } from "../../models/food-order.model";
export const getOrdersOfUser: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    const orders = await FoodOrderModel.find();
    let userOrders = [];
    for(let i = 0; i < orders.length; i++){
        if(String(orders[i].user) == userId){
            userOrders.push(orders[i]);
        }
    }
    if(userOrders.length == 0){
        res.json({message: "No orders placed on this user!"});
        return;
    }
    res.json(userOrders);
}