"use client";
import CategoryCard from "./CategoryCard";
import AddCategory from "./AddCategory";
import AllDishes from "./AllDishes";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { foodType, categoryType } from "../../types";
type propsType = {
  selectedCategoryState: {
    value: string;
    setter: Dispatch<SetStateAction<string>>;
  };
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
};
export default function CategoryCards({
  selectedCategoryState,
  rerenderState,
}: propsType) {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [categoryItems, setCategoryItems] = useState<foodType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllItems() {
      await fetch(
        `http://localhost:8000/food/get-all-foods-by-all-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error! Status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setCategoryItems(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getAllItems();
  }, [rerenderState.value]);
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
            throw new Error("HTTP error! status " + response.status);
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
    setIsLoading(false);
  }, [rerenderState.value]);
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="flex gap-[12px]">
      <AllDishes selectedCategoryState={selectedCategoryState} />
      {categories.map((category, categoryIndex) => {
        return (
          <CategoryCard
            rerenderState={rerenderState}
            categories={categories}
            selectedCategoryState={selectedCategoryState}
            key={categoryIndex}
            countOfItems={
              Array.isArray(categoryItems[categoryIndex])
                ? categoryItems[categoryIndex].length
                : 0
            }
            category={category}
          />
        );
      })}
      <AddCategory rerenderState={rerenderState} categories={categories} />
    </div>
  );
}
