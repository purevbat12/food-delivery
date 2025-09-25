import { categoryType, foodType } from "../types";
import { useState, useEffect } from "react";
import Food from "./Food";
import { Dispatch, SetStateAction } from "react";
type propsType = {
    category: categoryType;
    rerenderState: {
        value: number,
        setter: Dispatch<SetStateAction<number>>
    }
}
export default function Foods({category, rerenderState}: propsType){
    const [foods, setFoods] = useState<foodType[]>([]);
    useEffect(() => {
        async function getFoods(){
            await fetch(`http://localhost:8000/food/get-foods-by-category?categoryId=${category._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json();
            }).then(data => {
                setFoods(data.foodsByCategory);
            }).catch(err => console.error(err));
        }
        getFoods();
    }, []);
    return (
        <div className="flex gap-[36px] flex-wrap">
            {
                foods.map((food, foodIndex) => {
                    return <Food key={foodIndex} rerenderState={rerenderState} food={food}/>;
                })
            }
        </div>
    );
}