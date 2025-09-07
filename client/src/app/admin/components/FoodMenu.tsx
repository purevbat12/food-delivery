"use client";
import CategoryNav from "./categoryComponents/CategoryNav";
import Categories from "./categoryComponents/Categories";
import { useState, useEffect } from "react";
export default function Orders() {
  const [rerender, setRerender] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  return (
    <div className="bg-[#F4F4F5] w-[100%] px-[24px] py-[84px] flex flex-col gap-[24px]">
      <CategoryNav
        selectedCategoryState={{
          value: selectedCategory,
          setter: setSelectedCategory,
        }}
        rerenderState={{ value: rerender, setter: setRerender }}
      />
      <Categories
        selectedCategory={selectedCategory}
        rerenderState={{ value: rerender, setter: setRerender }}
      />
    </div>
  );
}
