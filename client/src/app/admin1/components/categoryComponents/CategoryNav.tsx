import { Dispatch, SetStateAction } from "react";
type categoryType = {
  categoryName?: string;
  _id?: string;
};
type propsType = {
  categories: categoryType[];
  countOfAllItems: number;
  countsOfItemsWithinCategory: Record<string, number>;
  setCategoryChoosen: Dispatch<SetStateAction<string>>;
  categoryChoosen: string;
  setCreateCategoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setUpdateCategoryModalIsOpen: Dispatch<SetStateAction<boolean>>;
  categoryToBeEditedId: string;
  setCategoryToBeEditedId: Dispatch<SetStateAction<string>>;
};
export default function CategoryNav(props: propsType) {
  return (
    <div className="bg-[#FFFFFF] p-[24px] rounded-[12px]">
      <h4 className="font-[600] text-[20px] text-[#09090B] mb-[16px]">
        Dishes Category
      </h4>
      <div className="flex gap-[12px] flex-wrap">
        <button
          onClick={() => {
            props.setCategoryChoosen("All Categories");
          }}
          className="py-[8px] px-[16px] rounded-[9999px] border border-[1px] cursor-pointer"
          style={{
            borderColor:
              props.categoryChoosen == "All Categories" ? "#EF4444" : "#E4E4E7",
          }}
        >
          <span className="text-[14px] font-[500]">
            All Categories
            <span className="text-[12px] font-[600] ml-[8px] bg-[#18181B] transition-all duration-[0.2s]  text-[#FAFAFA] py-[2px] px-[10px] rounded-[9999px]">
              {props.countOfAllItems}
            </span>
          </span>
        </button>
        {props.categories.map((category, categoryIndex) => {
          return (
            <div
              key={categoryIndex}
              className="flex gap-[10px] py-[8px] px-[16px] rounded-[9999px] border transition-all duration-[0.2s] border-[1px]"
              style={{
                borderColor:
                  props.categoryChoosen == category.categoryName
                    ? "#EF4444"
                    : "#E4E4E7",
              }}
            >
              <button
                className="cursor-pointer"
                onClick={() => {
                  props.setCategoryToBeEditedId(category._id ?? "");
                  props.setUpdateCategoryModalIsOpen(true);
                }}
              >
                <img
                  src="/images/icons/edit-246.png"
                  className="w-[20px] h-[20px]"
                ></img>
              </button>
              <button
                onClick={() => {
                  props.setCategoryChoosen(category.categoryName ?? "");
                }}
                className="cursor-pointer"
              >
                <span>
                  {category.categoryName}
                  <span className="text-[12px] font-[600] ml-[8px] bg-[#18181B] text-[#FAFAFA] py-[2px] px-[10px] rounded-[9999px]">
                    {
                      props.countsOfItemsWithinCategory[
                        Object.keys(props.countsOfItemsWithinCategory)[
                          categoryIndex
                        ]
                      ]
                    }
                  </span>
                </span>
              </button>
            </div>
          );
        })}
        <button
          onClick={() => {
            props.setCreateCategoryModalIsOpen(true);
          }}
          className="text-[25px] text-[#FAFAFA] bg-[#EF4444] rounded-[100%] w-[36px] h-[36px] cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
