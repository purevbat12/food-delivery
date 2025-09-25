"use client"
import { Dispatch, SetStateAction } from "react";
import Food from "./Food";
type foodItemType = {food: string, quantity: number};
type propsType = {
    pressedFoodState: {
        value: boolean;
        setter: Dispatch<SetStateAction<boolean>>;
    };
    foodsIds: foodItemType[];
}
export default function Foods({pressedFoodState, foodsIds}: propsType){
    return (
        <div className="bg-[#FFFFFF] rounded-[6px] p-[12px] absolute z-[4] flex-col gap-[12px] w-[100%]" style={{display: pressedFoodState.value ? "flex" : "none"}}>
            {
                foodsIds.map((foodId, foodIdIndex) => {
                    return <Food key={foodIdIndex} foodId={foodId}/>;
                })
            }
        </div>
    );
}