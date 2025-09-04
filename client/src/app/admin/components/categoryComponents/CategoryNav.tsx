"use client";
import { Dispatch, SetStateAction, useState } from "react";
import CategoryCards from "./CategoryCards";
type propsType = {
  selectedCategoryState: {
    value: string;
    setter: Dispatch<SetStateAction<string>>;
  };
};
export default function CategoryNav({ selectedCategoryState }: propsType) {
  return (
    <div className="bg-[#FFFFFF] w-[1171px] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
      <h1 className="text-[20px] font-[600]">Dishes category</h1>
      <div>
        <CategoryCards selectedCategoryState={selectedCategoryState} />
      </div>
    </div>
  );
}
