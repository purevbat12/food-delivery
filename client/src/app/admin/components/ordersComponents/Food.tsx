"use client"
import { useEffect, useState } from "react";
import { foodType } from "../../types";
type propsType = {
    foodId: {food: string, quantity: number};
}
export default function Food({foodId}: propsType){
    const [food, setFood] = useState<foodType>();
    useEffect(() => {
        async function getFood(){
            await fetch(`http://localhost:8000/food/get/${foodId.food}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json();
            }).then(data => {
                setFood(data);
            }).catch(err => {
                console.error(err);
            });
        }
        getFood();
    }, []);
    return (
        <div className="flex justify-between">
            <div className="flex gap-[7px]">
                <img className="rounded-[4px] h-[32px]" src={food?.image}></img>
                <span className="text-[12px] font-[400] text-[#09090B]">{food?.foodName}</span>
            </div>
            <span className="text-[#09090B] text-[12px] font-[400] ml-[10px]">X {foodId.quantity}</span>
        </div>
    );
}