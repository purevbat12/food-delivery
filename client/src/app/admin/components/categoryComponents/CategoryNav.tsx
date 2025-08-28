import { Dispatch, SetStateAction } from "react";
type categoryType = {
  categoryName?: string;
  id?: string;
};
type propsType = {
  categories: categoryType[];
  countOfAllItems: number;
  countsOfItemsWithinCategory: number[];
  setCategoryChoosen: Dispatch<SetStateAction<string>>;
  categoryChoosen: string;
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
          style={{ borderColor: "#EF4444" }}
        >
          <span className="text-[14px] font-[500]">
            All Categories
            <span className="text-[12px] font-[600] ml-[8px] bg-[#18181B] text-[#FAFAFA] py-[2px] px-[10px] rounded-[9999px]">
              {props.countOfAllItems}
            </span>
          </span>
        </button>
        {props.categories.map((category, categoryIndex) => {
          return (
            <button
              onClick={() => {
                props.setCategoryChoosen(category.categoryName ?? "");
              }}
              key={categoryIndex}
              className="py-[8px] px-[16px] rounded-[9999px] border border-[#E4E4E7] transition-all duration-[0.2s] border-[1px] cursor-pointer hover:border-[#EF4444]"
              style={{
                borderColor:
                  props.setCategoryChoosen == category ? "#EF4444" : "#E4E4E7",
              }}
            >
              <span>
                {category.categoryName}
                <span className="text-[12px] font-[600] ml-[8px] bg-[#18181B] text-[#FAFAFA] py-[2px] px-[10px] rounded-[9999px]">
                  {props.countsOfItemsWithinCategory[categoryIndex]}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
