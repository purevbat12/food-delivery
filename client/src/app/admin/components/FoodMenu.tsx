"use client";
import CategoryNav from "./categoryComponents/CategoryNav";
import { useState, useEffect } from "react";
export default function Orders() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  return (
    <div className="bg-[#F4F4F5] w-[100%] px-[24px] py-[84px]">
      <CategoryNav
        selectedCategoryState={{
          value: selectedCategory,
          setter: setSelectedCategory,
        }}
      />
    </div>
  );
}
