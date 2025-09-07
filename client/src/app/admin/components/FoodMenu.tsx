"use client";
import CategoryNav from "./categoryComponents/CategoryNav";
import Categories from "./categoryComponents/Categories";
import { useState, useEffect } from "react";
import { categoryType } from "../types";
export default function Orders() {
  const [rerender, setRerender] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [categories, setCategories] = useState<categoryType[]>([]);
  useEffect(() => {
    async function getCategories() {
      await fetch(`http://localhost:8000/food-category/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error! Status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data.allCategories);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getCategories();
  }, [rerender]);
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
        categories={categories}
        selectedCategory={selectedCategory}
        rerenderState={{ value: rerender, setter: setRerender }}
      />
    </div>
  );
}
