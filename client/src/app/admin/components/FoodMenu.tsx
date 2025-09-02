import { Dispatch, SetStateAction } from "react";
import Categories from "./categoryComponents/Categories";
import CategoryNav from "./categoryComponents/CategoryNav";
import { categoryType, foodType } from "../types";
type propsType = {
  setCategories: Dispatch<SetStateAction<categoryType[]>>;
  categories: categoryType[];
  countsOfItemsWithinCategory: Record<string, number>;
  setCountsOfItemsWithinCategory: Dispatch<
    SetStateAction<Record<string, number>>
  >;
  countOfAllItems: number;
  setCountOfAllItems: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  categoryChoosen: string;
  setCategoryChoosen: Dispatch<SetStateAction<string>>;
  setCreateCategoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setUpdateCategoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
  categoryToBeEditedId: string;
  setCategoryToBeEditedId: Dispatch<SetStateAction<string>>;
  foodsOfCategory: foodType[];
  createFoodModalIsOpen: boolean;
  setCreateFoodModalIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Orders(props: propsType) {
  if (props.loading) {
    return (
      <div>
        <h1 className="font-[700] text-[26px]">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-[#F4F4F5] w-[100%] h-[100vh] pr-[40px] pl-[24px] pt-[84px] gap-[24px]">
        <CategoryNav
          categories={props.categories}
          countOfAllItems={props.countOfAllItems}
          countsOfItemsWithinCategory={props.countsOfItemsWithinCategory}
          setCategoryChoosen={props.setCategoryChoosen}
          categoryChoosen={props.categoryChoosen}
          setCreateCategoryModalIsOpen={props.setCreateCategoryModalIsOpen}
          setUpdateCategoryModalIsOpen={props.setUpdateCategoryModalIsOpen}
          categoryToBeEditedId={props.categoryToBeEditedId}
          setCategoryToBeEditedId={props.setCategoryToBeEditedId}
        />
        <Categories
          categoryChoosen={props.categoryChoosen}
          foodsOfCategory={props.foodsOfCategory}
          categories={props.categories}
          countsOfItemsWithinCategory={props.countsOfItemsWithinCategory}
          createFoodModalIsOpen={props.createFoodModalIsOpen}
          setCreateFoodModalIsOpen={props.setCreateFoodModalIsOpen}
        />
      </div>
    );
  }
}
