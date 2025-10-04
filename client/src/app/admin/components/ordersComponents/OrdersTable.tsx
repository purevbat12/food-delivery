"use client"
import OrdersTableHeader from "./OrdersTableHeader";
import Orders from "./Orders";
import { orderType, userType } from "../../types";
import { useState, useEffect } from "react";
export const OrdersTable = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [users, setUsers] = useState<userType[]>([]);
  const [countOfCheckedOrders, setCountOfCheckedOrders] = useState(0);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const [rerender, setRerender] = useState(0);
  useEffect(() => {
    async function getOrders(){
      await fetch(`https://food-delivery-nl5n.onrender.com/food-order/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if(!response.ok){
          throw new Error("HTTP error! Status: " + response.status + " In getOrders");
        }
        return response.json();
      }).then(data => {
        setOrders(data.orders);
      }).catch(err => {
        console.error(err);
      });
    }
    getOrders();
  }, [rerender]);
  useEffect(() => {
    async function getUsers(){
      await fetch(`https://food-delivery-nl5n.onrender.com/auth/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if(!response.ok){
          throw new Error("HTTP error! Status: " + response.status + " In getUsers");
        }
        return response.json();
      }).then(data => {
        setUsers(data);
      }).catch(err => {
        console.error(err);
      });
    }
    getUsers();
  }, []);
  return (
    <div className="bg-[#FFFFFF] w-[95%] rounded-[16px] ml-[24px] mt-[60px]">
      <OrdersTableHeader checkedOrders={checkedOrders} countOfCheckedOrders={countOfCheckedOrders} orders={orders} rerenderState={{value: rerender, setter: setRerender}}/>
      <Orders setCountOfCheckedOrders={setCountOfCheckedOrders} rerenderState={{value: rerender, setter: setRerender}} orders={orders} users={users} setCheckedOrdersProp={setCheckedOrders}/>
    </div>
  );
};
