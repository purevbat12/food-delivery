import { Dispatch, SetStateAction } from "react";
import Categories from "./categoryComponents/Categories";
import CategoryNav from "./categoryComponents/CategoryNav";
type categoryType = {
  categoryName?: string;
  _id?: string;
};
type propsType = {
  setCategories: Dispatch<SetStateAction<categoryType[]>>;
  categories: categoryType[];
  countsOfItemsWithinCategory: number[];
  setCountsOfItemsWithinCategory: Dispatch<SetStateAction<number[]>>;
  countOfAllItems: number;
  setCountOfAllItems: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  categoryChoosen: string;
  setCategoryChoosen: Dispatch<SetStateAction<string>>;
  setCreateCategoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setUpdateCategoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
  categoryToBeDeletedName: string;
  setCategoryToBeDeletedName: Dispatch<SetStateAction<string>>;
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
      <div className="bg-[#F4F4F5] w-[100%] h-[100vh] pr-[40px] pl-[24px] pt-[84px]">
        <CategoryNav
          categories={props.categories}
          countOfAllItems={props.countOfAllItems}
          countsOfItemsWithinCategory={props.countsOfItemsWithinCategory}
          setCategoryChoosen={props.setCategoryChoosen}
          categoryChoosen={props.categoryChoosen}
          setCreateCategoryModalIsOpen={props.setCreateCategoryModalIsOpen}
          setUpdateCategoryModalIsOpen={props.setUpdateCategoryModalIsOpen}
          categoryToBeDeletedName={props.categoryToBeDeletedName}
          setCategoryToBeDeletedName={props.setCategoryToBeDeletedName}
        />
        <Categories />
      </div>
    );
  }
}
