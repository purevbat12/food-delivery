"use client"
import { foodType, cartType } from "../types";
import jwt from "jsonwebtoken";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "../auth/authProvider";
type propsType = {
    food: foodType;
    rerenderState: {
        value: number,
        setter: Dispatch<SetStateAction<number>>
    }
}
export default function FoodCard({food, rerenderState}: propsType){
    const [addOrderModalIsOpen, setAddOrderModalIsOpen] = useState(false);
    const { token } = useAuth();
    const [foodCount, setFoodCount] = useState(0);
    const [cart, setCart] = useState<cartType>();
    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        const decoded = jwt.decode(token) as {userId: string};
        async function getCart(){
            await fetch(`https://food-delivery-nl5n.onrender.com/food-cart/get/${decoded.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status + " In getCart.");
                }
                return response.json();
            }).then(data => {
                setCart(data);
            }).catch(err => {
                console.error(err);
            });
        }
        getCart();
    }, [rerenderState.value]);
    async function addToCart(){
        const newCartItems = (cart as cartType).cartItems;
        newCartItems?.push({food: food._id, quantity: foodCount});
        await fetch(`https://food-delivery-nl5n.onrender.com/food-cart/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id: cart?._id,
                updates: {
                    cartItems: newCartItems
                }
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status + " In addOrder.");
            }
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setFoodCount(0);
            rerenderState.setter(rerenderState.value + 1);
            setAddOrderModalIsOpen(false);
        });
    }
    return (
        <>
        <div className="bg-[#FFFFFF] rounded-[20px] p-[16px] w-[397.33px] h-[342px]">
            <div className="relative mb-[20px] ml-[50%] translate-x-[-50%]">
                <img className="h-[210px] rounded-[12px]" src={food.image}></img>
                <button onClick={() => {
                    setAddOrderModalIsOpen(true);
                }} className="absolute bg-[#FFFFFF] rounded-[100%] w-[44px] h-[44px] text-[#EF4444] cursor-pointer right-[30%] bottom-[10%]">+</button>
            </div>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-[#EF4444] text-[24px] font-[600]">{food.foodName}</h2>
                    <span>${food.price}</span>
                </div>
                <p className="text-[#09090B] text-[14px] font-[400]">{food.ingredients}</p>
            </div>
        </div>
        <Dialog open={addOrderModalIsOpen} onOpenChange={setAddOrderModalIsOpen}>
            <DialogContent className="max-w-[1000px] w-full p-0">
                <div className="flex gap-[24px] w-full">
                    <img className="w-[188px] rounded-[12px]" src={food.image}></img>
                    <div className="flex flex-col gap-[50px] flex-1">
                        <div>
                            <h2 className="text-[#EF4444] text-[30px] font-[600]">{food.foodName}</h2>
                            <p className="text-[#09090B] text-[16px] font-[400]">{food.ingredients}</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-[16px] font-[400] text-[#09090B]">Total price</p>
                                <h1 className="text-[24px] text-[#09090B] font-[600]">${foodCount * food.price}</h1>
                            </div>
                            <div className="flex gap-[5px] items-center">
                                <button onClick={() => {
                                    setFoodCount(foodCount - 1);
                                }} disabled={foodCount == 0} className="border w-[44px] h-[44px] rounded-[100%] cursor-pointer" style={{borderColor: foodCount == 0 ? "#E4E4E7" : "#09090B"}}>-</button>
                                <p className="text-[#09090B] font-[600] text-[18px]">{foodCount}</p>
                                <button onClick={() => {
                                    setFoodCount(foodCount + 1);
                                }} className="border w-[44px] h-[44px] rounded-[100%] cursor-pointer">+</button>
                            </div>
                        </div>
                        <Button onClick={() => {
                            addToCart();
                        }} disabled={foodCount == 0} className="rounded-[9999px] cursor-pointer">Add to cart</Button>
                    </div>
                </div>
                    </DialogContent>
                </Dialog>
        </>
    );
}