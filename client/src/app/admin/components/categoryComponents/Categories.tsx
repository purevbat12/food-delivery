import Category from "./Category";
import { categoryType, foodType } from "../../types";
import { Dispatch, SetStateAction } from "react";
type propsType = {
  categoryChoosen: string;
  foodsOfCategory: foodType[];
  categories: categoryType[];
  countsOfItemsWithinCategory: Record<string, number>;
  createFoodModalIsOpen: boolean;
  setCreateFoodModalIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Categories(props: propsType) {
  if (props.categoryChoosen == "All Categories") {
    return (
      <div className="flex flex-col gap-[20px]">
        {Object.keys(props.foodsOfCategory).map((category, categoryIndex) => {
          return (
            <Category
              createFoodModalIsOpen={props.createFoodModalIsOpen}
              setCreateFoodModalIsOpen={props.setCreateFoodModalIsOpen}
              key={categoryIndex}
              categoryName={Object.keys(props.foodsOfCategory)[categoryIndex]}
              countOfItemsWithinCategory={
                props.countsOfItemsWithinCategory[
                  Object.keys(props.countsOfItemsWithinCategory)[categoryIndex]
                ]
              }
            />
          );
        })}
      </div>
    );
  }
  let countOfItemsWithinCategory;
  for (
    let i = 0;
    i < Object.keys(props.countsOfItemsWithinCategory).length;
    i++
  ) {
    if (
      Object.keys(props.countsOfItemsWithinCategory)[i] == props.categoryChoosen
    ) {
      countOfItemsWithinCategory =
        props.countsOfItemsWithinCategory[
          Object.keys(props.countsOfItemsWithinCategory)[i]
        ];
      break;
    }
  }
  return (
    <div className="rounded-[12px] bg-[#FFFFFF] p-[24px]">
      <Category
        createFoodModalIsOpen={props.createFoodModalIsOpen}
        setCreateFoodModalIsOpen={props.setCreateFoodModalIsOpen}
        categoryName={props.categoryChoosen}
        countOfItemsWithinCategory={countOfItemsWithinCategory}
      />
    </div>
  );
}
