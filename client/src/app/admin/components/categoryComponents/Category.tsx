import CategoryFoodCard from "./CategoryFoodCard";
import { foodType } from "../../types";
import { Dispatch, SetStateAction } from "react";
type propsType = {
  title: string;
  foods: foodType[];
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
};
import AddFood from "./AddFood";
export default function Category({ title, foods, rerenderState }: propsType) {
  return (
    <div className="bg-[#FFFFFF] w-[1171px] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
      <h1 className="text-[20px] font-[600]">
        {title} ({foods.length})
      </h1>
      <div className="flex gap-[16px]">
        <AddFood title={title} rerenderState={rerenderState} />
        {foods.map((food, foodIndex) => {
          return <CategoryFoodCard key={foodIndex} food={food} />;
        })}
      </div>
    </div>
  );
}
