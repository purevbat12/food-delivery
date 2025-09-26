"use client"
import { useState, useEffect } from "react";
import { foodType } from "../types";
type propsType = {
    cartItem: {food: string, quantity: number};
}
export default function CartItem({cartItem}: propsType){
    const [allFoods, setAllFoods] = useState<foodType[]>([]);
    const [foods, setFoods] = useState<foodType[]>([]);
    useEffect(() => {
        async function getFoods(){
            await fetch(`http://localhost:8000/food/get-all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status + " In getFoots");
                }
                return response.json();
            }).then(data => {
                setAllFoods(data);
            });
        }
        getFoods();
    }, []);
    useEffect(() => {
        const results = allFoods.filter((food) => {
            return food._id == cartItem.food;
        });
        setFoods(results);
    }, [allFoods])
    return (
        <div>
            <img src="" className=""></img>
        </div>
    );
}