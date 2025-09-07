import CategoryFoodCard from "./CategoryFoodCard";
import { foodType, categoryType } from "../../types";
import { useState, Dispatch, SetStateAction } from "react";
type propsType = {
  title: string;
  foods: foodType[];
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
  categories: categoryType[];
};
import AddFood from "./AddFood";
export default function Category({
  title,
  foods,
  rerenderState,
  categories,
}: propsType) {
  return (
    <div className="bg-[#FFFFFF] w-[100%] flex-wrap rounded-[16px] p-[24px] flex flex-col gap-[16px]">
      <h1 className="text-[20px] font-[600]">
        {title} ({foods.length})
      </h1>
      <div className="flex gap-[16px] flex-wrap">
        <AddFood
          title={title}
          rerenderState={rerenderState}
          categories={categories}
        />
        {foods.map((food, foodIndex) => {
          return (
            <CategoryFoodCard
              currentCategory={title}
              rerenderState={rerenderState}
              key={foodIndex}
              food={food}
              categories={categories}
            />
          );
        })}
      </div>
    </div>
  );
}
